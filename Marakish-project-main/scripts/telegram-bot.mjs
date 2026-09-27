import 'dotenv/config';
import { readFileSync } from 'fs';
import { Telegraf, Markup } from 'telegraf';
import { GoogleGenAI } from '@google/genai';
import admin from 'firebase-admin';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 1. Initialize Firebase Admin
const serviceAccount = JSON.parse(
  readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'marakishshj',
  });
}
const db = admin.firestore();
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Lightweight In-Memory Wizard State
const userSessions = new Map();

// --- UI MENUS ---
const getManagementDashboard = () => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('🔍 Find Vehicle', 'mgmt_search'),
      Markup.button.callback('🛒 Purchase Vehicle', 'mgmt_buy')
    ],
    [
      Markup.button.callback('🤝 Sell Vehicle', 'mgmt_sell'),
      Markup.button.callback('✏️ Update Vehicle', 'mgmt_update')
    ],
    [
      Markup.button.callback('📋 Live Inventory', 'mgmt_inventory'),
      Markup.button.callback('🏦 Bank Portals', 'mgmt_portals')
    ]
  ]);
};

// Formats clean vehicle card for Management
const formatVehicleCard = (d) => {
  return (
    `🚘 *VEHICLE RECORD CARD*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔖 *Serial No:* \`${d.serialNumber || 'N/A'}\`\n` +
    `📋 *CRN / Plate:* \`${d.crn || 'N/A'}\`\n` +
    `🆔 *Chassis / VIN:* \`${d.vinChassisNumber || 'N/A'}\`\n` +
    `🚗 *Make & Model:* ${d.manufacturer || ''} ${d.model || ''} (${d.modelYear || 'N/A'})\n` +
    `🎨 *Color:* ${d.color?.name || d.color || 'N/A'}\n` +
    `📌 *Status:* *${(d.soldStatus || d.status || 'Active').toUpperCase()}*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━`
  );
};

// Middleware: Strict Identity Lookup & Session Guard
bot.use(async (ctx, next) => {
  const telegramId = ctx.from?.id;

  if (!telegramId) return;

  // Query users collection in Firestore
  const userSnap = await db.collection('users')
    .where('telegramId', '==', telegramId)
    .limit(1)
    .get();

  if (userSnap.empty) {
    // Unverified Access Handling
    return ctx.reply(
      `⛔ *Access Denied: Unregistered Account*\n\n` +
      `Your Telegram ID (\`${telegramId}\`) is not linked to Marakish Management.\n` +
      `Please contact the administrator or verify your account via the web portal settings.`,
      { parse_mode: 'Markdown' }
    );
  }

  const userData = userSnap.docs[0].data();
  if (userData.status !== 'Active') {
    return ctx.reply('⚠️ Your account has been temporarily disabled by management.');
  }

  // Attach verified user profile to context
  ctx.state.user = userData;
  return next();
});

// /start Greeting & Personalization
const sendGreeting = async (ctx) => {
  const user = ctx.state.user;
  userSessions.delete(ctx.from.id);

  await ctx.reply(
    `Hi ${user.displayName || 'User'},\n` +
    `I'm Samy Bot 🤖, the Marakish Portal assistant.\n` +
    `I can assist you with:`,
    { parse_mode: 'Markdown', ...getManagementDashboard() }
  );
};

bot.start(sendGreeting);
bot.command(['status', 'menu', 'help'], sendGreeting);

async function showInventory(ctx) {
  try {
    const vehSnap = await db.collection('vehicles').where('soldStatus', '!=', 'Sold').limit(8).get();
    let text = `📋 *ACTIVE YARD INVENTORY*\n━━━━━━━━━━━━━━━━━━━━━━\n`;

    vehSnap.docs.forEach((doc, idx) => {
      const d = doc.data();
      text += `*${idx + 1}.* \`${d.serialNumber || 'No Serial'}\` | *CRN:* \`${d.crn || 'N/A'}\`\n` +
        `   ↳ ${d.manufacturer || ''} ${d.model || ''}${d.modelYear || ''} (${d.color?.name || d.color || 'N/A'})\n`;
    });

    await ctx.reply(text, { parse_mode: 'Markdown', ...getManagementDashboard() });
  } catch (err) {
    await ctx.reply(`⚠️ Error: ${err.message}`);
  }
}

bot.command('inventory', async (ctx) => {
  userSessions.delete(ctx.from.id);
  return showInventory(ctx);
});

// Cancel Action
bot.action('cancel_action', async (ctx) => {
  userSessions.delete(ctx.from.id);
  if (ctx.callbackQuery) await ctx.answerCbQuery('Action cancelled').catch(() => {});
  await sendGreeting(ctx);
});

// --------------------------------------------------------
// FIND VEHICLE WORKFLOW
// --------------------------------------------------------
bot.action('mgmt_search', async (ctx) => {
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  await ctx.reply('🔍 *Find Vehicle*\n\nPlease select a filter option to search by:', {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([
      [Markup.button.callback('Model', 'search_filter_model'), Markup.button.callback('CRN', 'search_filter_crn')],
      [Markup.button.callback('Chassis Number', 'search_filter_vin'), Markup.button.callback('Vehicle Number', 'search_filter_serial')],
      [Markup.button.callback('✖ Cancel / Main Menu', 'cancel_action')]
    ])
  });
});

bot.action(/search_filter_(model|crn|vin|serial)/, async (ctx) => {
  const filterType = ctx.match[1];
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  
  userSessions.set(ctx.from.id, { step: 'AWAITING_SEARCH_QUERY', filterType });

  let prompt = '';
  if (filterType === 'model') prompt = 'Please type the *Model* name (e.g., Camry):';
  else if (filterType === 'crn') prompt = 'Please type the *CRN* (Plate Number):';
  else if (filterType === 'vin') prompt = 'Please type any *3+ consecutive characters* from the Chassis Number (beginning, middle, or end):';
  else if (filterType === 'serial') prompt = 'Please type the *Vehicle Number* digits (e.g., 0488 for VL0488):\n_Note: I will automatically add "VL" for you._';

  await ctx.reply(prompt, { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) });
});

async function executeSearch(ctx, filterType, queryTerm, page = 0) {
  await ctx.sendChatAction('typing');
  const cleanTerm = queryTerm.trim();
  
  if (filterType === 'vin' && cleanTerm.length < 3) {
    return ctx.reply('⚠️ For Chassis Number search, please provide **at least 3 characters** (letters or numbers).', { parse_mode: 'Markdown' });
  }
  
  let query = db.collection('vehicles');
  let isAdvancedFilter = false;

  if (filterType === 'crn') {
    const num = Number(cleanTerm);
    if (!isNaN(num)) query = query.where('crn', '==', num);
    else query = query.where('crn', '==', cleanTerm);
  } else if (filterType === 'serial') {
    const serialPrefixed = cleanTerm.toUpperCase().startsWith('VL') ? cleanTerm.toUpperCase() : `VL${cleanTerm.padStart(4, '0')}`;
    query = query.where('serialNumber', '==', serialPrefixed);
  } else {
    // Model or VIN require string matching, which Firestore doesn't do natively via LIKE.
    // We fetch a recent batch and filter locally.
    isAdvancedFilter = true;
  }

  let results = [];

  if (isAdvancedFilter) {
    const activeVehicles = await db.collection('vehicles').orderBy('purchasingDate', 'desc').limit(500).get();
    activeVehicles.docs.forEach(doc => {
      const v = doc.data();
      if (filterType === 'model' && String(v.model || '').toLowerCase().includes(cleanTerm.toLowerCase())) {
        results.push(v);
      } else if (filterType === 'vin' && String(v.vinChassisNumber || '').toLowerCase().includes(cleanTerm.toLowerCase())) {
        results.push(v);
      }
    });
  } else {
    const snap = await query.limit(50).get();
    results = snap.docs.map(d => d.data());
  }

  if (results.length === 0) {
    return ctx.reply(`❌ No vehicle records found matching: \`${queryTerm}\``, { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) });
  }

  // Save to session for pagination
  userSessions.set(ctx.from.id, { step: 'SEARCH_PAGINATION', results, queryTerm, filterType, page });
  
  return renderSearchResults(ctx, results, page);
}

async function renderSearchResults(ctx, results, page) {
  const PAGE_SIZE = 5;
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageResults = results.slice(start, end);
  
  if (pageResults.length === 0) {
    return ctx.reply("No more results.");
  }

  const buttons = pageResults.map(v => {
    const label = `${v.serialNumber}: ${v.manufacturer} ${v.model} (${v.crn || 'No CRN'})`;
    return [Markup.button.callback(label.substring(0,60), `view_vehicle_${v.serialNumber}`)];
  });

  const controls = [];
  if (end < results.length) {
    controls.push(Markup.button.callback('⏬ Find More', `search_page_${page + 1}`));
  }
  controls.push(Markup.button.callback('✖ Cancel', 'cancel_action'));
  buttons.push(controls);

  await ctx.reply(
    `🔍 *Search Results (${results.length} total)*\nShowing ${start + 1} to ${Math.min(end, results.length)}:\n_Tap a vehicle to view details._`,
    { parse_mode: 'Markdown', ...Markup.inlineKeyboard(buttons) }
  );
}

bot.action(/search_page_(\d+)/, async (ctx) => {
  const page = parseInt(ctx.match[1], 10);
  const session = userSessions.get(ctx.from.id);
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  
  if (session && session.step === 'SEARCH_PAGINATION') {
    return renderSearchResults(ctx, session.results, page);
  } else {
    return ctx.reply("Search session expired. Please search again.");
  }
});

bot.action(/view_vehicle_(.+)/, async (ctx) => {
  const serial = ctx.match[1];
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});

  const doc = await db.collection('vehicles').doc(serial).get();
  if (!doc.exists) return ctx.reply("Vehicle not found!");

  const targetData = doc.data();

  return ctx.reply(formatVehicleCard(targetData), {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('🤝 Sell', `sell_quick_${targetData.serialNumber}`),
        Markup.button.callback('✏️ Update', `update_quick_${targetData.serialNumber}`)
      ],
      [Markup.button.callback('✖ Cancel', 'cancel_action')]
    ])
  });
});

bot.action(/sell_quick_(.+)/, async (ctx) => {
  const serial = ctx.match[1];
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  await ctx.reply(`⚠️ Sell workflow for ${serial} is coming in the next update!`, { ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) });
});

bot.action(/update_quick_(.+)/, async (ctx) => {
  const serial = ctx.match[1];
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  await ctx.reply(`⚠️ Update workflow for ${serial} is coming in the next update!`, { ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) });
});


bot.action('mgmt_sell', (ctx) => {
  if (ctx.callbackQuery) ctx.answerCbQuery().catch(() => {});
  ctx.reply("🤝 *Sell Vehicle*\n\nPlease Find the vehicle first using [🔍 Find Vehicle] to mark it as sold.", { parse_mode: 'Markdown', ...getManagementDashboard() });
});

bot.action('mgmt_update', (ctx) => {
  if (ctx.callbackQuery) ctx.answerCbQuery().catch(() => {});
  ctx.reply("✏️ *Update Vehicle*\n\nPlease Find the vehicle first using [🔍 Find Vehicle] to update it.", { parse_mode: 'Markdown', ...getManagementDashboard() });
});


// --------------------------------------------------------
// PURCHASE WORKFLOW & HYBRID ENGINE
// --------------------------------------------------------

bot.action('mgmt_buy', (ctx) => startPurchaseWizard(ctx));
bot.action('mgmt_portals', (ctx) => showBankPortals(ctx));

async function showBankPortals(ctx) {
  if (ctx.callbackQuery) await ctx.answerCbQuery('Loading Portals...').catch(() => {});
  try {
    const portalSnap = await db.collection('bankPortal').get();
    let total = 0;
    let text = `🏦 *EXECUTIVE LIQUIDITY & PORTALS*\n━━━━━━━━━━━━━━━━━━━━━━\n`;

    portalSnap.docs.forEach((doc) => {
      const d = doc.data();
      const bal = Number(d.balance || 0);
      total += bal;
      text += `• *${d.bankPortalName || doc.id}:* \`${bal.toLocaleString('en-US', { minimumFractionDigits: 2 })}\` AED\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━━\n💰 *Total Available:* \`${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}\` AED`;
    await ctx.reply(text, { parse_mode: 'Markdown', ...getManagementDashboard() });
  } catch (err) {
    await ctx.reply(`⚠️ Error: ${err.message}`);
  }
}

async function validatePurchaseDraftAndAsk(ctx, draft) {
  // 1. Manufacturer
  const manufSnap = await db.collection('manufacturers').get();
  const validManufs = manufSnap.docs.map(d => d.id);
  if (!draft.manufacturer || !validManufs.includes(draft.manufacturer)) {
    const buttons = validManufs.map(m => Markup.button.callback(m, `set_draft_manufacturer_${m}`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 3) chunked.push(buttons.slice(i, i + 3));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);
    
    return ctx.reply(`Please select the **Manufacturer**:`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 2. Model
  const modelSnap = await db.collection('manufacturers').doc(draft.manufacturer).collection('models').get();
  const validModels = modelSnap.docs.map(d => d.data().model);
  if (!draft.model || !validModels.includes(draft.model)) {
    const buttons = validModels.map(m => Markup.button.callback(m, `set_draft_model_${m}`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 3) chunked.push(buttons.slice(i, i + 3));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);

    return ctx.reply(`Please select the exact **Model** for ${draft.manufacturer}:`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 3. Vendor
  const vendorSnap = await db.collection('vendorsList').where('status', '==', true).get();
  const validVendors = vendorSnap.docs.map(d => d.data().name);
  if (!draft.vendor || !validVendors.includes(draft.vendor)) {
    const buttons = validVendors.map(m => Markup.button.callback(m, `set_draft_vendor_${m}`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 2) chunked.push(buttons.slice(i, i + 2));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);

    return ctx.reply(`Please select the **Vendor**:`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 4. Payment Portal
  const portalSnap = await db.collection('bankPortal').where('status', '==', true).get();
  const validPortals = portalSnap.docs.map(d => d.data().bankPortalName);
  if (!draft.paymentPortalName || !validPortals.includes(draft.paymentPortalName)) {
    const buttons = validPortals.map(m => Markup.button.callback(m, `set_draft_portal_${m}`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 2) chunked.push(buttons.slice(i, i + 2));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);

    return ctx.reply(`Please select the **Payment Source**:`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 5. Basic Text Constraints
  if (!draft.modelYear) {
    userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft, missingField: 'modelYear' });
    return ctx.reply("Please type the **Model Year** (e.g. 2015):", { parse_mode: 'Markdown' });
  }
  
  if (!draft.crn && draft.crn !== 'Skipped') {
    userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft, missingField: 'crn' });
    return ctx.reply("Please type the **CRN / Plate Number** (or type 'skip' if unavailable):", { parse_mode: 'Markdown' });
  }

  if (!draft.vehiclePurchaseCost) {
    userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft, missingField: 'vehiclePurchaseCost' });
    return ctx.reply("Please type the **Purchase Price** in AED:", { parse_mode: 'Markdown' });
  }

  if (Number(draft.paidAmount || 0) > Number(draft.vehiclePurchaseCost)) {
    userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft, missingField: 'paidAmount' });
    return ctx.reply(`⚠️ The paid amount (${draft.paidAmount}) cannot exceed the purchase price (${draft.vehiclePurchaseCost}). Please type the correct **Paid Amount**:`, { parse_mode: 'Markdown' });
  }

  // If we made it here, everything is perfectly valid and matches the DB!
  userSessions.set(ctx.from.id, { step: 'BUY_VERIFICATION', draft });
  return presentVerificationCard(ctx, draft);
}

// Handle Dynamic Button Clicks for Draft Setters
bot.action(/set_draft_(manufacturer|model|vendor|portal)_(.+)/, async (ctx) => {
  const session = userSessions.get(ctx.from.id);
  if (!session || !session.draft) return ctx.answerCbQuery('Session expired', { show_alert: true });
  
  const field = ctx.match[1];
  const value = ctx.match[2];
  
  if (field === 'manufacturer') session.draft.manufacturer = value;
  if (field === 'model') session.draft.model = value;
  if (field === 'vendor') session.draft.vendor = value;
  if (field === 'portal') session.draft.paymentPortalName = value;

  await ctx.answerCbQuery().catch(() => {});
  userSessions.set(ctx.from.id, session);
  return validatePurchaseDraftAndAsk(ctx, session.draft);
});

async function aiProcessPurchase(ctx, userText, session) {
  await ctx.sendChatAction('typing');
  
  const draft = session.draft || {};
  
  // If we were waiting for a specific text field:
  if (session.missingField) {
    if (session.missingField === 'crn' && userText.toLowerCase() === 'skip') {
      draft.crn = 'Skipped';
    } else {
      draft[session.missingField] = userText;
    }
    session.missingField = null;
    userSessions.set(ctx.from.id, session);
    return validatePurchaseDraftAndAsk(ctx, draft);
  }

  const prompt = `You are an intelligent vehicle purchasing data extractor.
Your job is to extract raw vehicle purchase details from the user's natural language and update the draft state.

Current Draft State (JSON):
${JSON.stringify(draft)}

New User Message:
"${userText}"

Instructions:
1. Extract any new or corrected information from the user's message and apply it to the draft.
2. For manufacturer, try to normalize (e.g. Toyota, Nissan).
3. Do NOT invent fields. If they didn't provide it, leave it as is or empty.
4. Return ONLY a raw JSON object representing the updated draft. NO markdown, NO backticks.
{
  "crn": "string or number",
  "manufacturer": "string",
  "model": "string",
  "modelYear": "string",
  "vendor": "string",
  "vehiclePurchaseCost": "number",
  "paymentPortalName": "string",
  "vinChassisNumber": "string",
  "parkingLocation": "string",
  "purchaseDate": "YYYY-MM-DD",
  "paidAmount": "number",
  "color": "string"
}`;

  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ text: prompt }]
    });
    
    let rawText = aiResponse.text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(rawText);
    session.draft = parsed;
    userSessions.set(ctx.from.id, session);
    
    return validatePurchaseDraftAndAsk(ctx, session.draft);
    
  } catch (err) {
    return ctx.reply(`⚠️ AI Processing Error: ${err.message}`);
  }
}

async function startPurchaseWizard(ctx, initialText = null) {
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft: {} });
  
  if (initialText) {
    return aiProcessPurchase(ctx, initialText, userSessions.get(ctx.from.id));
  } else {
    await ctx.reply(
      `🛒 *New Purchase / Inward Registration*\n\n` +
      `Please describe the vehicle you are purchasing or send a photo/voice note.\n\n` +
      `_Example: Buy a 2015 Camry white from Orient for 15k_`,
      { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) }
    );
  }
}

async function presentVerificationCard(ctx, draft) {
  const summaryText =
    `*Please confirm the exact details.*\n\n` +
    `• *Purchase Date:* ${draft.purchaseDate || new Date().toISOString().split('T')[0]}\n` +
    `• *Manufacturer:* ${draft.manufacturer || draft.make}\n` +
    `• *Model:* ${draft.model}\n` +
    `• *Model Year:* ${draft.modelYear || draft.year}\n` +
    `• *CRN:* ${draft.crn || 'Skipped'}\n` +
    `• *Parking Location:* ${draft.parkingLocation || 'Not Collected'}\n` +
    `• *Vendor:* ${draft.vendor || 'Unknown'}\n` +
    `• *Purchasing Price:* AED ${Number(draft.vehiclePurchaseCost || 0).toLocaleString()}\n` +
    `• *Paid Amount:* AED ${Number(draft.paidAmount || draft.vehiclePurchaseCost || 0).toLocaleString()}\n` +
    `• *Chassis Number (VIN):* ${draft.vinChassisNumber || draft.vin || 'Pending'}\n` +
    `• *Payment Source:* ${draft.paymentPortalName || 'Not Provided'}\n\n` +
    `_Reply with any corrections (e.g. "Change the date to yesterday") or tap Confirm._`;

  return ctx.reply(summaryText, {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('✅ Confirm & Save Record', 'pipeline_commit_purchase')
      ],
      [
        Markup.button.callback('❌ Abort & Discard', 'cancel_action')
      ]
    ])
  });
}

// Step 4: Safe Test Commit to separate collection!
bot.action('pipeline_commit_purchase', async (ctx) => {
  const session = userSessions.get(ctx.from.id);
  if (!session || !session.draft) {
    return ctx.reply('⚠️ No active session found. Please start over.', getManagementDashboard());
  }

  await ctx.answerCbQuery('Running Test Commit...');
  const draft = session.draft;
  
  try {
    // Write ONLY to a safe test collection so the user can verify data integrity
    const testPayload = {
      testDate: admin.firestore.FieldValue.serverTimestamp(),
      simulatedUser: ctx.state.user.displayName,
      simulatedVehicle: {
        manufacturer: draft.manufacturer || '',
        model: draft.model || '',
        modelYear: Number(draft.modelYear),
        vendor: draft.vendor || '',
        parkingLocation: draft.parkingLocation || 'Not Collected',
        vehiclePurchaseCost: Number(draft.vehiclePurchaseCost || 0),
        crn: Number(draft.crn) || draft.crn || '',
        vinChassisNumber: draft.vinChassisNumber || draft.vin || 'Pending',
      },
      simulatedLedgers: {
        vendorPaymentDeduction: Number(draft.paidAmount || draft.vehiclePurchaseCost || 0),
        bankPortalDeducted: draft.paymentPortalName || 'Unknown',
      }
    };

    await db.collection('test_telebot_purchases').add(testPayload);
    userSessions.delete(ctx.from.id);

    await ctx.reply(
      `🛑 *[TEST MODE] - PURCHASE BLOCKED*\n\n` +
      `You currently have no access to purchase the vehicle into the live database. \n\n` +
      `_However, your submission was successfully recorded as a duplicate record in the "test_telebot_purchases" Firestore collection for Admin review._`,
      { parse_mode: 'Markdown', ...getManagementDashboard() }
    );
  } catch (err) {
    console.error('Test Commit Error:', err);
    await ctx.reply(`❌ *Database Error:* ${err.message}`, getManagementDashboard());
  }
});

// Image Ingestion (Mulkiya / Document OCR)
bot.on('photo', async (ctx) => {
  const session = userSessions.get(ctx.from.id);
  await ctx.sendChatAction('typing');

  try {
    const photo = ctx.message.photo[ctx.message.photo.length - 1];
    const fileUrl = await ctx.telegram.getFileLink(photo.file_id);
    const response = await fetch(fileUrl.href);
    const arrayBuffer = await response.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    // Multimodal OCR extraction via Gemini
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Data
          }
        },
        {
          text: `Extract official vehicle details from this UAE Mulkiya or inspection document. 
Return ONLY clean JSON:
{
  "crn": "plate or registration number",
  "vin": "17 character chassis number",
  "make": "manufacturer name",
  "model": "model name",
  "year": "4-digit year as number"
}`
        }
      ]
    });

    const parsed = JSON.parse(aiResponse.text.replace(/```json|```/g, '').trim());

    if (session && (session.step === 'BUY_AI_CONVERSATION' || session.step === 'BUY_VERIFICATION')) {
      const docDetails = `Document Scanned: CRN: ${parsed.crn}, VIN: ${parsed.vin}, Make: ${parsed.make}, Model: ${parsed.model}, Year: ${parsed.year}`;
      return aiProcessPurchase(ctx, docDetails, session);
    }

    return ctx.reply(
      `🔍 *Document Scanned:*\n` +
      `• *CRN:* \`${parsed.crn || 'N/A'}\`\n` +
      `• *VIN:* \`${parsed.vin || 'N/A'}\`\n` +
      `• *Vehicle:* ${parsed.make || ''} ${parsed.model || ''} (${parsed.year || ''})`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🛒 Import to Purchase Draft', 'start_ocr_purchase')],
          [Markup.button.callback('✖ Dismiss', 'cancel_action')]
        ])
      }
    );
  } catch (err) {
    await ctx.reply(`⚠️ Could not parse vehicle document: ${err.message}`);
  }
});

bot.action('start_ocr_purchase', async (ctx) => {
  startPurchaseWizard(ctx);
});

// Voice Note Processing (Audio Parsing)
bot.on('voice', async (ctx) => {
  await ctx.sendChatAction('typing');
  try {
    const fileUrl = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
    const response = await fetch(fileUrl.href);
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');

    // Transcribe & extract parameters with Gemini
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          inlineData: {
            mimeType: 'audio/ogg',
            data: base64Audio
          }
        },
        {
          text: `Transcribe this voice note and extract intent and vehicle parameters (CRN, serial, make, model, action). Answer in clean English.`
        }
      ]
    });

    const session = userSessions.get(ctx.from.id);
    if (session && (session.step === 'BUY_AI_CONVERSATION' || session.step === 'BUY_VERIFICATION')) {
      return aiProcessPurchase(ctx, aiResponse.text, session);
    }

    await ctx.reply(`🎙️ *Voice Note Interpretation:*\n\n"${aiResponse.text}"`, {
      parse_mode: 'Markdown',
      ...getManagementDashboard()
    });
  } catch (err) {
    await ctx.reply(`⚠️ Could not process voice recording: ${err.message}`);
  }
});

async function handleSessionStep(ctx, session, text) {
  if (session.step === 'BUY_AI_CONVERSATION' || session.step === 'BUY_VERIFICATION') {
    return aiProcessPurchase(ctx, text, session);
  }

  if (session.step === 'AWAITING_SEARCH_QUERY') {
    return executeSearch(ctx, session.filterType, text, 0);
  }
}

// Intent Matcher Dictionary
const INTENT_PATTERNS = {
  PURCHASE: /\b(buy|purchase|inward|add|new car|new vehicle|register vehicle)\b/i,
};

bot.on('text', async (ctx) => {
  const text = ctx.message.text.trim();
  const session = userSessions.get(ctx.from.id);

  if (text.startsWith('/')) return; // Ignore commands

  // If in an active multi-step wizard, pass to session handler
  if (session && session.step) {
    return handleSessionStep(ctx, session, text);
  }

  // 1. Keyword Intent Extraction
  let matchedIntent = null;
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(text)) {
      matchedIntent = intent;
      break;
    }
  }

  if (matchedIntent === 'PURCHASE') {
    return startPurchaseWizard(ctx, text);
  }
  
  // No match
  return sendGreeting(ctx);
});

bot.launch();
console.log('🚀 @marakishbot SamyBot Pipeline is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

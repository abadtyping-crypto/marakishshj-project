const fs = require('fs');

const code = `import 'dotenv/config';
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
      Markup.button.callback('🛒 Purchase / Inward', 'mgmt_buy'),
      Markup.button.callback('🤝 Sell / Outward', 'mgmt_sell')
    ],
    [
      Markup.button.callback('🔍 Find by Serial / CRN', 'mgmt_search'),
      Markup.button.callback('📋 Live Inventory', 'mgmt_inventory')
    ],
    [
      Markup.button.callback('🏦 Bank & Cash Portals', 'mgmt_portals')
    ]
  ]);
};

// Formats clean vehicle card for Management
const formatVehicleCard = (d) => {
  return (
    \`🚘 *VEHICLE RECORD CARD*\\n\` +
    \`━━━━━━━━━━━━━━━━━━━━━━\\n\` +
    \`🔖 *Serial No:* \\\`\${d.serialNumber || 'N/A'}\\\`\\n\` +
    \`📋 *CRN / Plate:* \\\`\${d.crn || 'N/A'}\\\`\\n\` +
    \`🆔 *Chassis / VIN:* \\\`\${d.vinChassisNumber || 'N/A'}\\\`\\n\` +
    \`🚗 *Make & Model:* \${d.manufacturer || ''} \${d.model || ''} (\${d.modelYear || 'N/A'})\\n\` +
    \`🎨 *Color:* \${d.color?.name || d.color || 'N/A'}\\n\` +
    \`📌 *Status:* *\${(d.status || 'Active').toUpperCase()}*\\n\` +
    \`━━━━━━━━━━━━━━━━━━━━━━\`
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
      \`⛔ *Access Denied: Unregistered Account*\\n\\n\` +
      \`Your Telegram ID (\\\`\${telegramId}\\\`) is not linked to Marakish Management.\\n\` +
      \`Please contact the administrator or verify your account via the web portal settings.\`,
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
bot.start(async (ctx) => {
  const user = ctx.state.user;
  userSessions.delete(ctx.from.id);

  await ctx.reply(
    \`✅ *Yes, you are securely connected with Marakish Yard data.*\\n\\n\` +
    \`Welcome \${user.displayName || 'User'}. Let me know how I can help you today.\`,
    { parse_mode: 'Markdown', ...getManagementDashboard() }
  );
});

bot.command(['status', 'menu'], async (ctx) => {
  userSessions.delete(ctx.from.id);
  const user = ctx.state.user;
  await ctx.reply(
    \`✅ *Yes, you are securely connected with Marakish Yard data.*\\n\\n\` +
    \`Welcome \${user.displayName || 'User'}. Let me know how I can help you today.\`,
    { parse_mode: 'Markdown', ...getManagementDashboard() }
  );
});

bot.command('help', async (ctx) => {
  userSessions.delete(ctx.from.id);
  await ctx.reply(
    \`ℹ️ *Help & Instructions*\\n\\n\` +
    \`I am connected directly to the Marakish Yard database.\\n\\n\` +
    \`You can type naturally to:\\n\` +
    \`• Buy / Inward vehicles\\n\` +
    \`• Sell / Outward vehicles\\n\` +
    \`• Search for vehicles\\n\` +
    \`• Send Mulkiya photos for OCR\\n\` +
    \`• Send Voice notes to log purchases\`,
    { parse_mode: 'Markdown', ...getManagementDashboard() }
  );
});

async function showInventory(ctx) {
  try {
    const vehSnap = await db.collection('vehicles').where('soldStatus', '!=', 'Sold').limit(8).get();
    let text = \`📋 *ACTIVE YARD INVENTORY*\\n━━━━━━━━━━━━━━━━━━━━━━\\n\`;

    vehSnap.docs.forEach((doc, idx) => {
      const d = doc.data();
      text += \`*\${idx + 1}.* \\\`\${d.serialNumber || 'No Serial'}\\\` | *CRN:* \\\`\${d.crn || 'N/A'}\\\`\\n\` +
        \`   ↳ \${d.manufacturer || ''} \${d.model || ''}\${d.modelYear || ''} (\${d.color?.name || d.color || 'N/A'})\\n\`;
    });

    await ctx.reply(text, { parse_mode: 'Markdown', ...getManagementDashboard() });
  } catch (err) {
    await ctx.reply(\`⚠️ Error: \${err.message}\`);
  }
}

bot.command('inventory', async (ctx) => {
  userSessions.delete(ctx.from.id);
  return showInventory(ctx);
});

// Intent Matcher Dictionary
const INTENT_PATTERNS = {
  PURCHASE: /\\b(buy|purchase|inward|add|new car|new vehicle|register vehicle)\\b/i,
  SALE: /\\b(sell|sold|outward|remove|discharge)\\b/i,
  SEARCH: /\\b(find|search|where|lookup|check|locate|chassis|plate)\\b/i,
  BALANCE: /\\b(balance|portal|bank|petty cash|money|statement)\\b/i,
};

// Intent Confirmation Callbacks
bot.action(/confirm_intent_(.+)/, async (ctx) => {
  const intent = ctx.match[1];
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});

  if (intent === 'PURCHASE') return startPurchaseWizard(ctx);
  if (intent === 'SALE') return startSaleWizard(ctx);
  if (intent === 'SEARCH') return startSearchWizard(ctx);
  if (intent === 'BALANCE') return showBankPortals(ctx);
});

bot.action('cancel_intent_fallback', async (ctx) => {
  if (ctx.callbackQuery) await ctx.answerCbQuery('Cancelled').catch(() => {});
  await ctx.reply(
    \`Understood. Please describe your request or choose an option from the menu:\`,
    getManagementDashboard()
  );
});

bot.action('mgmt_buy', (ctx) => startPurchaseWizard(ctx));
bot.action('mgmt_sell', (ctx) => startSaleWizard(ctx));
bot.action('mgmt_search', (ctx) => startSearchWizard(ctx));
bot.action('mgmt_portals', (ctx) => showBankPortals(ctx));
bot.action('mgmt_inventory', async (ctx) => {
  if (ctx.callbackQuery) await ctx.answerCbQuery('Fetching Inventory...').catch(() => {});
  return showInventory(ctx);
});

// Cancel Action
bot.action('cancel_action', async (ctx) => {
  userSessions.delete(ctx.from.id);
  if (ctx.callbackQuery) await ctx.answerCbQuery('Action cancelled').catch(() => {});
  await ctx.reply('Action cancelled. Returning to main menu:', getManagementDashboard());
});

async function showBankPortals(ctx) {
  if (ctx.callbackQuery) await ctx.answerCbQuery('Loading Portals...').catch(() => {});
  try {
    const portalSnap = await db.collection('bankPortal').get();
    let total = 0;
    let text = \`🏦 *EXECUTIVE LIQUIDITY & PORTALS*\\n━━━━━━━━━━━━━━━━━━━━━━\\n\`;

    portalSnap.docs.forEach((doc) => {
      const d = doc.data();
      const bal = Number(d.balance || 0);
      total += bal;
      text += \`• *\${d.bankPortalName || doc.id}:* \\\`\${bal.toLocaleString('en-US', { minimumFractionDigits: 2 })}\\\` AED\\n\`;
    });

    text += \`━━━━━━━━━━━━━━━━━━━━━━\\n💰 *Total Available:* \\\`\${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}\\\` AED\`;
    await ctx.reply(text, { parse_mode: 'Markdown', ...getManagementDashboard() });
  } catch (err) {
    await ctx.reply(\`⚠️ Error: \${err.message}\`);
  }
}

async function startSearchWizard(ctx) {
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  userSessions.set(ctx.from.id, { step: 'AWAITING_SEARCH_QUERY' });
  await ctx.reply(
    \`🔍 *Vehicle Lookup*\\n\\n\` +
    \`Please type the *Serial Number* (e.g., \\\`VL0488\\\`) or the *CRN Number* (Plate Number):\`,
    { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) }
  );
}

async function startSaleWizard(ctx) {
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  userSessions.set(ctx.from.id, { step: 'SELL_AWAITING_ID' });
  await ctx.reply(
    \`🤝 *Vehicle Outward / Sale*\\n\\n\` +
    \`Please enter the *Serial Number* (e.g., \\\`VL0488\\\`) or *CRN* to mark as Sold:\`,
    { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) }
  );
}

// --------------------------------------------------------
// STRICT VALIDATION & HYBRID BUTTON ENGINE
// --------------------------------------------------------

async function validatePurchaseDraftAndAsk(ctx, draft) {
  // We check exactly what is missing and present buttons if it's a constrained choice
  
  // 1. Manufacturer
  const manufSnap = await db.collection('manufacturers').get();
  const validManufs = manufSnap.docs.map(d => d.id);
  if (!draft.manufacturer || !validManufs.includes(draft.manufacturer)) {
    const buttons = validManufs.map(m => Markup.button.callback(m, \`set_draft_manufacturer_\${m}\`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 3) chunked.push(buttons.slice(i, i + 3));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);
    
    return ctx.reply(\`Please select the **Manufacturer**:\`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 2. Model
  const modelSnap = await db.collection('manufacturers').doc(draft.manufacturer).collection('models').get();
  const validModels = modelSnap.docs.map(d => d.data().model);
  if (!draft.model || !validModels.includes(draft.model)) {
    const buttons = validModels.map(m => Markup.button.callback(m, \`set_draft_model_\${m}\`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 3) chunked.push(buttons.slice(i, i + 3));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);

    return ctx.reply(\`Please select the exact **Model** for \${draft.manufacturer}:\`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 3. Vendor
  const vendorSnap = await db.collection('vendorsList').where('status', '==', true).get();
  const validVendors = vendorSnap.docs.map(d => d.data().name);
  if (!draft.vendor || !validVendors.includes(draft.vendor)) {
    const buttons = validVendors.map(m => Markup.button.callback(m, \`set_draft_vendor_\${m}\`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 2) chunked.push(buttons.slice(i, i + 2));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);

    return ctx.reply(\`Please select the **Vendor**:\`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard(chunked)
    });
  }

  // 4. Payment Portal
  const portalSnap = await db.collection('bankPortal').where('status', '==', true).get();
  const validPortals = portalSnap.docs.map(d => d.data().bankPortalName);
  if (!draft.paymentPortalName || !validPortals.includes(draft.paymentPortalName)) {
    const buttons = validPortals.map(m => Markup.button.callback(m, \`set_draft_portal_\${m}\`));
    const chunked = [];
    for (let i = 0; i < buttons.length; i += 2) chunked.push(buttons.slice(i, i + 2));
    chunked.push([Markup.button.callback('✖ Cancel', 'cancel_action')]);

    return ctx.reply(\`Please select the **Payment Source**:\`, {
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
    return ctx.reply(\`⚠️ The paid amount (\${draft.paidAmount}) cannot exceed the purchase price (\${draft.vehiclePurchaseCost}). Please type the correct **Paid Amount**:\`, { parse_mode: 'Markdown' });
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

  const prompt = \`You are an intelligent vehicle purchasing data extractor.
Your job is to extract raw vehicle purchase details from the user's natural language and update the draft state.

Current Draft State (JSON):
\${JSON.stringify(draft)}

New User Message:
"\${userText}"

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
}\`;

  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ text: prompt }]
    });
    
    let rawText = aiResponse.text;
    rawText = rawText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    
    const parsed = JSON.parse(rawText);
    session.draft = parsed;
    userSessions.set(ctx.from.id, session);
    
    return validatePurchaseDraftAndAsk(ctx, session.draft);
    
  } catch (err) {
    return ctx.reply(\`⚠️ AI Processing Error: \${err.message}\`);
  }
}

async function startPurchaseWizard(ctx, initialText = null) {
  if (ctx.callbackQuery) await ctx.answerCbQuery().catch(() => {});
  userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft: {} });
  
  if (initialText) {
    return aiProcessPurchase(ctx, initialText, userSessions.get(ctx.from.id));
  } else {
    await ctx.reply(
      \`🛒 *New Purchase / Inward Registration*\\n\\n\` +
      \`Please describe the vehicle you are purchasing or send a photo/voice note.\\n\\n\` +
      \`_Example: Buy a 2015 Camry white from Orient for 15k_\`,
      { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) }
    );
  }
}

async function presentVerificationCard(ctx, draft) {
  const summaryText =
    \`*Please confirm the exact details.*\\n\\n\` +
    \`• *Purchase Date:* \${draft.purchaseDate || new Date().toISOString().split('T')[0]}\\n\` +
    \`• *Manufacturer:* \${draft.manufacturer || draft.make}\\n\` +
    \`• *Model:* \${draft.model}\\n\` +
    \`• *Model Year:* \${draft.modelYear || draft.year}\\n\` +
    \`• *CRN:* \${draft.crn || 'Skipped'}\\n\` +
    \`• *Parking Location:* \${draft.parkingLocation || 'Not Collected'}\\n\` +
    \`• *Vendor:* \${draft.vendor || 'Unknown'}\\n\` +
    \`• *Purchasing Price:* AED \${Number(draft.vehiclePurchaseCost || 0).toLocaleString()}\\n\` +
    \`• *Paid Amount:* AED \${Number(draft.paidAmount || draft.vehiclePurchaseCost || 0).toLocaleString()}\\n\` +
    \`• *Chassis Number (VIN):* \${draft.vinChassisNumber || draft.vin || 'Pending'}\\n\` +
    \`• *Payment Source:* \${draft.paymentPortalName || 'Not Provided'}\\n\\n\` +
    \`_Reply with any corrections (e.g. "Change the date to yesterday") or tap Confirm._\`;

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

// Step 4: Full Atomic Commit to Firestore Matching React UI!
bot.action('pipeline_commit_purchase', async (ctx) => {
  const session = userSessions.get(ctx.from.id);
  if (!session || !session.draft) {
    return ctx.reply('⚠️ No active session found. Please start over.', getManagementDashboard());
  }

  await ctx.answerCbQuery('Running Atomic Commit...');
  const draft = session.draft;
  const numericPrice = Number(draft.vehiclePurchaseCost || 0);
  const numericPaid = Number(draft.paidAmount || draft.vehiclePurchaseCost || 0);
  const purchaseDateObj = admin.firestore.Timestamp.fromDate(new Date(draft.purchaseDate || new Date().toISOString().split('T')[0]));

  try {
    const result = await db.runTransaction(async (transaction) => {
      // 1. Get Counters & Bank Details (READs first)
      const countersRef = db.collection('setting').doc('counter');
      const bankRef = db.collection('bankPortal').doc(draft.paymentPortalName);

      const countersDoc = await transaction.get(countersRef);
      const bankDoc = await transaction.get(bankRef);

      if (!countersDoc.exists) throw new Error('Counters document missing!');
      const counters = countersDoc.data();

      // Helper to increment ID
      const incrementId = (lastId) => {
        if (!lastId) return '000001';
        const prefix = lastId.match(/^[A-Z]+/)?.[0] || '';
        const numberPart = lastId.match(/\\d+$/)?.[0] || '0';
        const newNumber = String(Number(numberPart) + 1).padStart(numberPart.length, '0');
        return prefix + newNumber;
      };

      const newSerialNumber = incrementId(counters.lastSerialNumber);
      const newPurchaseId = incrementId(counters.lastVehiclePurchasing);
      const newVendorPaymentId = incrementId(counters.lastVendorsPayment);
      const newBankTxId = incrementId(counters.lastBankTransaction);

      // 2. Create Vehicle
      const vehicleRef = db.collection('vehicles').doc(newSerialNumber);
      transaction.set(vehicleRef, {
        serialNumber: newSerialNumber,
        manufacturer: draft.manufacturer || '',
        model: draft.model || '',
        modelYear: Number(draft.modelYear),
        vendor: draft.vendor || '',
        parkingLocation: draft.parkingLocation || 'Not Collected',
        purchasingDate: purchaseDateObj,
        vehiclePurchaseCost: numericPrice,
        totalAccruedCost: numericPrice,
        crn: Number(draft.crn) || draft.crn || '',
        vinChassisNumber: draft.vinChassisNumber || draft.vin || 'Pending',
        soldStatus: 'Available',
        mubayaStatus: 'Not Requested',
        color: draft.color || null,
        createdBy: ctx.state.user.displayName || 'Telegram Management',
      });

      // 3. Create Vehicle Purchasing Record
      const purchaseRef = db.collection('vehiclePurchasing').doc(newPurchaseId);
      transaction.set(purchaseRef, {
        transactionId: newPurchaseId,
        purchaseDate: purchaseDateObj,
        purchasePrice: numericPrice,
        serialNumber: newSerialNumber,
        vendor: draft.vendor || '',
        status: true,
      });

      // 4. Create Vendor Payment
      const vendorPaymentRef = db.collection('vendorsPayment').doc(newVendorPaymentId);
      transaction.set(vendorPaymentRef, {
        Serial_Number: newSerialNumber,
        balance: numericPrice - numericPaid,
        date: purchaseDateObj,
        paidAmount: numericPaid,
        paidPortal: draft.paymentPortalName || 'Unknown',
        status: true,
        vehiclePurchaseId: numericPrice,
        vendorName: draft.vendor || '',
        transactionId: newVendorPaymentId,
      });

      // 5. Create Bank Transaction
      const bankTxRef = db.collection('bankTransaction').doc(newBankTxId);
      transaction.set(bankTxRef, {
        transactionId: newBankTxId,
        amount: numericPaid,
        bankPortalName: draft.paymentPortalName || 'Unknown',
        date: purchaseDateObj,
        description: \`Purchase: \${newSerialNumber} - \${draft.manufacturer} \${draft.model} - \${draft.vendor}\`,
        status: true,
        type: 'Debit',
      });

      // 6. Update Bank Balance
      if (bankDoc.exists) {
        const currentBalance = bankDoc.data().balance || 0;
        transaction.update(bankRef, { balance: currentBalance - numericPaid });
      } else {
        // Fallback if they search by label, need to query
        const portalQuery = await db.collection('bankPortal').where('bankPortalName', '==', draft.paymentPortalName).get();
        if (!portalQuery.empty) {
          const actualBankRef = portalQuery.docs[0].ref;
          const currentBalance = portalQuery.docs[0].data().balance || 0;
          transaction.update(actualBankRef, { balance: currentBalance - numericPaid });
        }
      }

      // 7. Update Counters
      transaction.update(countersRef, {
        lastSerialNumber: newSerialNumber,
        lastVehiclePurchasing: newPurchaseId,
        lastVendorsPayment: newVendorPaymentId,
        lastBankTransaction: newBankTxId,
      });

      return { newSerialNumber };
    });

    // Clear session
    userSessions.delete(ctx.from.id);

    await ctx.reply(
      \`🎉 *VEHICLE SECURELY COMMITTED*\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\` +
      \`🔖 *Assigned Serial:* \\\`\${result.newSerialNumber}\\\`\\n\` +
      \`📋 *CRN:* \\\`\${draft.crn}\\\`\\n\` +
      \`🚗 *Vehicle:* \${draft.manufacturer} \${draft.model} (\${draft.modelYear})\\n\` +
      \`🅿️ *Location:* \${draft.parkingLocation || 'Not Collected'}\\n\\n\` +
      \`_All Ledgers (Vehicle, Vendor, Bank, Counters) Updated Successfully._\`,
      { parse_mode: 'Markdown', ...getManagementDashboard() }
    );
  } catch (err) {
    console.error('Firestore Commit Error:', err);
    await ctx.reply(\`❌ *Database Integrity Error:* \${err.message}\`, getManagementDashboard());
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
          text: \`Extract official vehicle details from this UAE Mulkiya or inspection document. 
Return ONLY clean JSON:
{
  "crn": "plate or registration number",
  "vin": "17 character chassis number",
  "make": "manufacturer name",
  "model": "model name",
  "year": "4-digit year as number"
}\`
        }
      ]
    });

    const parsed = JSON.parse(aiResponse.text.replace(/\`\`\`json|\`\`\`/g, '').trim());

    if (session && (session.step === 'BUY_AI_CONVERSATION' || session.step === 'BUY_VERIFICATION')) {
      const docDetails = \`Document Scanned: CRN: \${parsed.crn}, VIN: \${parsed.vin}, Make: \${parsed.make}, Model: \${parsed.model}, Year: \${parsed.year}\`;
      return aiProcessPurchase(ctx, docDetails, session);
    }

    return ctx.reply(
      \`🔍 *Document Scanned:*\\n\` +
      \`• *CRN:* \\\`\${parsed.crn || 'N/A'}\\\`\\n\` +
      \`• *VIN:* \\\`\${parsed.vin || 'N/A'}\\\`\\n\` +
      \`• *Vehicle:* \${parsed.make || ''} \${parsed.model || ''} (\${parsed.year || ''})\`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🛒 Import to Purchase Draft', 'start_ocr_purchase')],
          [Markup.button.callback('✖ Dismiss', 'cancel_action')]
        ])
      }
    );
  } catch (err) {
    await ctx.reply(\`⚠️ Could not parse vehicle document: \${err.message}\`);
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
          text: \`Transcribe this voice note and extract intent and vehicle parameters (CRN, serial, make, model, action). Answer in clean English.\`
        }
      ]
    });

    const session = userSessions.get(ctx.from.id);
    if (session && (session.step === 'BUY_AI_CONVERSATION' || session.step === 'BUY_VERIFICATION')) {
      return aiProcessPurchase(ctx, aiResponse.text, session);
    }

    await ctx.reply(\`🎙️ *Voice Note Interpretation:*\\n\\n"\${aiResponse.text}"\`, {
      parse_mode: 'Markdown',
      ...getManagementDashboard()
    });
  } catch (err) {
    await ctx.reply(\`⚠️ Could not process voice recording: \${err.message}\`);
  }
});

async function executeDirectLookup(ctx, queryTerm) {
  await ctx.sendChatAction('typing');
  const cleanTerm = queryTerm.trim();
  const numericTerm = !isNaN(cleanTerm) ? Number(cleanTerm) : null;
  const serialPrefixed = cleanTerm.toUpperCase().startsWith('VL')
    ? cleanTerm.toUpperCase()
    : \`VL\${cleanTerm.padStart(4, '0')}\`;

  const safeDocId = serialPrefixed.replace(/\\//g, '');

  const [docDirect, bySerial, byCrnNumber, byCrnString] = await Promise.all([
    safeDocId ? db.collection('vehicles').doc(safeDocId).get() : Promise.resolve({ exists: false }),
    db.collection('vehicles').where('serialNumber', '==', serialPrefixed).limit(1).get(),
    numericTerm !== null ? db.collection('vehicles').where('crn', '==', numericTerm).limit(1).get() : Promise.resolve({ empty: true }),
    db.collection('vehicles').where('crn', '==', cleanTerm).limit(1).get()
  ]);

  let targetData = null;
  if (docDirect.exists) targetData = docDirect.data();
  else if (!bySerial.empty) targetData = bySerial.docs[0].data();
  else if (!byCrnNumber.empty) targetData = byCrnNumber.docs[0].data();
  else if (!byCrnString.empty) targetData = byCrnString.docs[0].data();

  if (!targetData) {
    const activeVehicles = await db.collection('vehicles').orderBy('purchasingDate', 'desc').limit(200).get();
    for (const doc of activeVehicles.docs) {
      const v = doc.data();
      const vinStr = String(v.vinChassisNumber || '').toLowerCase();
      const serialStr = String(v.serialNumber || '').toLowerCase();
      const modelStr = String(v.model || '').toLowerCase();
      const makeStr = String(v.manufacturer || '').toLowerCase();

      if (
        vinStr.includes(cleanTerm) ||
        serialStr.includes(cleanTerm) ||
        modelStr.includes(cleanTerm) ||
        makeStr.includes(cleanTerm)
      ) {
        targetData = v;
        break;
      }
    }
  }

  if (!targetData) {
    return ctx.reply(
      \`❌ No vehicle record found matching: \\\`\${queryTerm}\\\`\\n\\n\` +
      \`Check the VIN snippet, Model, CRN, or Serial number.\`,
      { parse_mode: 'Markdown', ...getManagementDashboard() }
    );
  }

  return ctx.reply(formatVehicleCard(targetData), {
    parse_mode: 'Markdown',
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('🤝 Mark as Sold', \`sell_quick_\${targetData.serialNumber}\`),
        Markup.button.callback('🅿️ Change Parking', \`move_parking_\${targetData.serialNumber}\`)
      ],
      [Markup.button.callback('↩️ Main Menu', 'cancel_action')]
    ])
  });
}

async function handleSessionStep(ctx, session, text) {
  if (session.step === 'BUY_AI_CONVERSATION' || session.step === 'BUY_VERIFICATION') {
    return aiProcessPurchase(ctx, text, session);
  }

  if (session.step === 'AWAITING_SEARCH_QUERY') {
    userSessions.delete(ctx.from.id);
    return executeDirectLookup(ctx, text);
  }
}

// Universal Text Router with Confirmation Dialog
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

  if (matchedIntent) {
    if (matchedIntent === 'PURCHASE') {
      return startPurchaseWizard(ctx, text);
    }
    
    const intentLabels = {
      SALE: 'Sell / Mark Vehicle as Outward',
      SEARCH: 'Lookup / Find a Vehicle',
      BALANCE: 'View Bank & Cash Portals',
    };

    // Explicit Confirmation Loop for non-purchase intents
    return ctx.reply(
      \`🎯 *Did you mean:* **"\${intentLabels[matchedIntent]}"**?\\n\\nPlease confirm your request:\`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [
            Markup.button.callback('✅ Yes, Proceed', \`confirm_intent_\${matchedIntent}\`),
            Markup.button.callback('❌ No, Cancel', 'cancel_intent_fallback')
          ]
        ])
      }
    );
  }

  // Fallback Flow: treat any unparsed input as a multi-field vehicle search
  return executeDirectLookup(ctx, text);
});

bot.launch();
console.log('🚀 @marakishbot Advanced Auth & NLP Pipeline is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
`;

fs.writeFileSync('scripts/telegram-bot.mjs', code, 'utf8');
console.log('Successfully wrote to scripts/telegram-bot.mjs');

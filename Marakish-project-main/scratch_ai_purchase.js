async function aiProcessPurchase(ctx, userText, session) {
  await ctx.sendChatAction('typing');
  
  const draft = session.draft || {};
  
  const prompt = `You are an intelligent vehicle purchasing assistant for Marakish Yard.
Your job is to extract vehicle purchase details from the user's natural language and update the draft state.

Current Draft State (JSON):
${JSON.stringify(draft)}

New User Message:
"${userText}"

Instructions:
1. Extract any new or corrected information from the user's message and apply it to the draft.
2. The Mandatory fields are: CRN, Manufacturer, Model, Model Year, Vendor, Purchasing Price (Cost), and Payment Portal Name.
3. The Optional fields are: Chassis Number (VIN), Parking Location, and Paid Amount.
4. Check if ALL mandatory fields have a valid value. (If CRN is missing but they say "skip plate", set CRN to "Skipped").
5. Return a JSON object with this EXACT schema, containing NO markdown formatting (just raw JSON):
{
  "updatedDraft": {
    "crn": "string or number",
    "manufacturer": "string",
    "model": "string",
    "modelYear": "string",
    "vendor": "string",
    "vehiclePurchaseCost": "number",
    "paymentPortalName": "string",
    "vinChassisNumber": "string",
    "parkingLocation": "string"
  },
  "isComplete": boolean,
  "replyText": "If isComplete is false, politely ask the user for ONLY the missing mandatory fields in 1-2 sentences. If isComplete is true, say exactly 'READY_FOR_CONFIRMATION'."
}`;

  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [{ text: prompt }]
    });
    
    // Parse the JSON (clean any markdown blocks if Gemini returns them)
    let rawText = aiResponse.text;
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(rawText);
    session.draft = parsed.updatedDraft;
    
    if (parsed.isComplete || parsed.replyText === 'READY_FOR_CONFIRMATION') {
      session.step = 'BUY_VERIFICATION';
      userSessions.set(ctx.from.id, session);
      return presentVerificationCard(ctx, session.draft);
    } else {
      userSessions.set(ctx.from.id, session);
      return ctx.reply(parsed.replyText);
    }
    
  } catch (err) {
    return ctx.reply(`⚠️ AI Processing Error: ${err.message}`);
  }
}

// Updated startPurchaseWizard
async function startPurchaseWizard(ctx, initialText = null) {
  if (ctx.answerCbQuery) await ctx.answerCbQuery();
  userSessions.set(ctx.from.id, { step: 'BUY_AI_CONVERSATION', draft: {} });
  
  if (initialText) {
    return aiProcessPurchase(ctx, initialText, userSessions.get(ctx.from.id));
  } else {
    await ctx.reply(
      `🛒 *New Purchase / Inward Registration*\n\n` +
      `Please describe the vehicle you are purchasing in your own words, or send a voice note/photo.\n\n` +
      `*Example:* "Purchase a Toyota Camry 2015 from Orient Insurance for 15000 AED paid via ADIB. CRN is 455656."`,
      { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('✖ Cancel', 'cancel_action')]]) }
    );
  }
}

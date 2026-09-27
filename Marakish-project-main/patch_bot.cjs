const fs = require('fs');

const content = fs.readFileSync('scripts/telegram-bot.mjs', 'utf8');

const newCommitBlock = `// Step 4: Safe Test Commit to separate collection!
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
      \`🛑 *[TEST MODE] - PURCHASE BLOCKED*\\n\\n\` +
      \`You currently have no access to purchase the vehicle into the live database. \\n\\n\` +
      \`_However, your submission was successfully recorded as a duplicate record in the "test_telebot_purchases" Firestore collection for Admin review._\`,
      { parse_mode: 'Markdown', ...getManagementDashboard() }
    );
  } catch (err) {
    console.error('Test Commit Error:', err);
    await ctx.reply(\`❌ *Database Error:* \${err.message}\`, getManagementDashboard());
  }
});`;

// We use regex to replace the old bot.action('pipeline_commit_purchase', ...) up to the end of its catch block
const modifiedContent = content.replace(
  /\/\/ Step 4: Full Atomic Commit to Firestore Matching React UI![\s\S]*?bot\.action\('pipeline_commit_purchase'[\s\S]*?\}\);/m,
  newCommitBlock
);

fs.writeFileSync('scripts/telegram-bot.mjs', modifiedContent, 'utf8');
console.log('Successfully applied test mode patch to scripts/telegram-bot.mjs');

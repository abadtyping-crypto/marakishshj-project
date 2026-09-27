import 'dotenv/config';
import { readFileSync } from 'fs';
import admin from 'firebase-admin';

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

async function updateColors() {
  console.log('Fetching all vehicles...');
  const snapshot = await db.collection('vehicles').get();
  console.log(`Found ${snapshot.size} vehicles. Updating colors to White...`);
  
  let updated = 0;
  for (const doc of snapshot.docs) {
    await doc.ref.update({
      color: {
        name: 'White',
        codes: '#FFFFFF'
      }
    });
    updated++;
  }
  
  console.log(`Successfully updated ${updated} vehicles with the new white color column structure.`);
  process.exit(0);
}

updateColors().catch(console.error);

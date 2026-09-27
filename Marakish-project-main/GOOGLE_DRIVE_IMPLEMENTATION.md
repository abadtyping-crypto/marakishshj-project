# Google Drive Integration - Implementation Summary

## ✅ What Has Been Implemented

### 1. **Google Drive Utility Module** (`src/utils/google-drive.ts`)
- Google Drive API client initialization
- User authentication (sign in/sign out)
- Automatic folder creation functionality
- Functions to create vehicle folder structure:
  - Main folder: `{serialNumber} - {manufacturer} {model} {year}`
  - Subfolders: "Pics" and "Docs"
- Automatic URL generation for created folders

### 2. **Configuration File** (`src/config/google-drive-config.ts`)
- Centralized configuration for Google API credentials
- Contains placeholders for:
  - API Key
  - OAuth Client ID
  - Parent folder ID (already set to your "List of Vehicle" folder)
- Easy to update without modifying code

### 3. **Vehicle Purchase Integration** (`src/sections/vehicle/vehicle-purchase-dialog.tsx`)
- Google Drive API initialization when dialog opens
- Automatic folder creation after successful vehicle purchase
- Folder URLs stored in Firestore fields:
  - `picsUrl`: URL to Pics folder
  - `docsUrl`: URL to Docs folder
- Error handling (won't block purchase if folder creation fails)

### 4. **Dependencies Installed**
- ✅ `gapi-script`: Google API JavaScript client library
- ✅ `@types/gapi`: TypeScript type definitions for GAPI

## 📋 What You Need to Do

### **STEP 1: Set Up Google Cloud Project**
Follow the detailed guide in `GOOGLE_DRIVE_SETUP.md` to:
1. Create/access a Google Cloud project
2. Enable Google Drive API
3. Create OAuth 2.0 credentials
4. Get your API Key and Client ID

### **STEP 2: Update Configuration**
Open `src/config/google-drive-config.ts` and replace:
```typescript
apiKey: 'YOUR_API_KEY_HERE',  // ← Replace with your API key
clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',  // ← Replace with your Client ID
```

### **STEP 3: Share Parent Folder**
Make sure the "List of Vehicle" folder is shared with the Google account you'll use:
- Folder URL: https://drive.google.com/drive/folders/17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8
- Share with Editor permissions

### **STEP 4: Test**
1. Run the app: `npm run dev`
2. Open Vehicle Purchase dialog
3. Sign in to Google Drive when prompted
4. Purchase a vehicle
5. Check that folders are created in Drive
6. Verify that `picsUrl` and `docsUrl` are in Firestore

## 🔄 How It Works

### Flow Diagram:
```
1. User clicks "Purchase New Vehicle"
   ↓
2. Dialog opens → Google Drive API initializes
   ↓
3. User fills vehicle details → Clicks "Purchase"
   ↓
4. Firestore transaction creates vehicle record
   ↓
5. Google Drive API creates folders:
   - Main folder: "VL1524 - Nissan Sunny 2024"
     - Subfolder: "Pics"
     - Subfolder: "Docs"
   ↓
6. System updates vehicle record with folder URLs
   ↓
7. Google Chat notification sent
   ↓
8. Dialog closes
```

## 📂 File Structure

```
src/
├── config/
│   └── google-drive-config.ts          # API credentials (⚠️ UPDATE THIS)
├── utils/
│   └── google-drive.ts                # Google Drive API utilities
└── sections/
    └── vehicle/
        └── vehicle-purchase-dialog.tsx # Integration point

GOOGLE_DRIVE_SETUP.md                  # Detailed setup guide
```

## 🔐 Security Notes

- ⚠️ **NEVER commit your API keys to version control**
- The current setup uses placeholder values
- Consider using environment variables for production
- OAuth 2.0 provides secure user authentication
- The app only has access to folders it creates (not all Drive files)

## 🐛 Troubleshooting

If folders are not being created:
1. Check browser console for errors
2. Ensure you're signed in to Google Drive
3. Verify the parent folder ID is correct
4. Confirm the authenticated user has Editor access to parent folder
5. Check that Google Drive API is enabled in Google Cloud Console

## 📝 Next Steps

1. **Complete Google Cloud Setup**: Follow `GOOGLE_DRIVE_SETUP.md`
2. **Update Config File**: Add your API credentials
3. **Test Locally**: Create a test vehicle and verify folder creation
4. **Deploy**: Update production config with production domain
5. **Monitor**: Check API usage in Google Cloud Console

## 📞 Support

For detailed setup instructions, see: `GOOGLE_DRIVE_SETUP.md`

For Google Drive API documentation: https://developers.google.com/drive/api/v3/about-sdk

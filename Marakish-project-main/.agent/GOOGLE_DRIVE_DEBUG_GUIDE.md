# Google Drive Folder Creation - Debug Guide

## 🔍 Current Implementation

### How It Works (Lines 602-767 in vehicle-purchase-dialog.tsx)

1. **Sign-in Check** (Line 607):
   ```typescript
   await signInToGoogleDrive();
   ```
   - Attempts to sign in to Google Drive
   - **Requires user interaction** (popup)
   - If fails, shows confirmation dialog

2. **Folder Creation** (Lines 741-746):
   ```typescript
   const folders = await createVehicleFolders(
     result.newSerialNumber,  // e.g., "VL1525"
     manufacturer,            // e.g., "Toyota"
     model,                   // e.g., "Camry"
     Number(modelYear)        // e.g., 2024
   );
   ```

3. **Update Vehicle** (Lines 750-758):
   - Updates Firestore with `picsUrl` and `docsUrl`

## 🐛 Common Issues & Solutions

### Issue 1: "Google API Init Failed: Origin mismatch"
**Cause**: `app.marakish.org` not authorized in Google Cloud Console

**Solution**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** > **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Add `https://app.marakish.org` to **Authorized JavaScript origins**
6. Add `https://app.marakish.org` to **Authorized redirect URIs**
7. Save changes

### Issue 2: "Popup blocked"
**Cause**: Browser blocked the Google sign-in popup

**Solution**:
- Allow popups for `app.marakish.org`
- Or sign in manually before purchasing vehicle

### Issue 3: "User not signed in"
**Cause**: Google Drive authentication expired

**Solution**:
- The code will automatically prompt for sign-in
- Click "Sign in" when prompted
- Grant necessary permissions

### Issue 4: "Failed to create folder"
**Cause**: Insufficient permissions or invalid parent folder ID

**Solution**:
1. Check `PARENT_FOLDER_ID` in `src/config/google-drive-config.ts`
2. Ensure the service account/user has write access to parent folder
3. Verify folder ID is correct

## 🧪 How to Test

### Step 1: Check Configuration
```typescript
// File: src/config/google-drive-config.ts
export const GOOGLE_DRIVE_CONFIG = {
  apiKey: 'YOUR_API_KEY',
  clientId: 'YOUR_CLIENT_ID',
  parentFolderId: 'YOUR_PARENT_FOLDER_ID', // ← Verify this!
  // ...
};
```

### Step 2: Test on Production

1. **Navigate to**: `https://app.marakish.org`
2. **Open Console**: Press `F12`
3. **Go to**: Purchase Vehicle page
4. **Fill form** with test data:
   - Manufacturer: Toyota
   - Model: Camry
   - Year: 2024
   - Price: 50000
   - (Fill all required fields)
5. **Click Submit**
6. **Watch Console** for these messages:

**Expected Success Flow**:
```
Starting folder creation for VL1525 - Toyota Camry 2024
User not signed in. Attempting to sign in...
Sign-in successful.
Attempting to create folder "VL1525 - Toyota Camry 2024" in parent "PARENT_FOLDER_ID"
Folder "VL1525 - Toyota Camry 2024" created successfully. ID: FOLDER_ID
Attempting to create folder "Pics" in parent "FOLDER_ID"
Folder "Pics" created successfully. ID: PICS_FOLDER_ID
Attempting to create folder "Docs" in parent "FOLDER_ID"
Folder "Docs" created successfully. ID: DOCS_FOLDER_ID
Vehicle folders created successfully: { picsUrl: "...", docsUrl: "..." }
Google Drive folders created successfully: { picsUrl: "...", docsUrl: "..." }
```

**If Error Occurs**:
```
Error initializing Google Drive API: Origin mismatch
// OR
Google Drive Sign-in failed: Popup blocked
// OR
Error creating folder "VL1525 - Toyota Camry 2024": 403 Forbidden
```

### Step 3: Verify in Google Drive

1. Go to [Google Drive](https://drive.google.com)
2. Navigate to the parent folder
3. Look for folder: `VL1525 - Toyota Camry 2024`
4. Inside should be two subfolders:
   - `Pics`
   - `Docs`

### Step 4: Check Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Go to **Firestore Database**
3. Find the vehicle document (e.g., `VL1525`)
4. Check fields:
   - `picsUrl`: Should be `https://drive.google.com/drive/folders/PICS_FOLDER_ID`
   - `docsUrl`: Should be `https://drive.google.com/drive/folders/DOCS_FOLDER_ID`

## 🔧 Debug Console Commands

### Check if Google API is initialized:
```javascript
console.log('GAPI loaded:', typeof gapi !== 'undefined');
console.log('Auth instance:', gapi?.auth2?.getAuthInstance()?.isSignedIn?.get());
```

### Manually trigger sign-in:
```javascript
// In browser console on app.marakish.org
import { signInToGoogleDrive } from './src/utils/google-drive';
await signInToGoogleDrive();
```

### Check current configuration:
```javascript
import { GOOGLE_DRIVE_CONFIG } from './src/config/google-drive-config';
console.log('Config:', GOOGLE_DRIVE_CONFIG);
```

## 📋 Troubleshooting Checklist

- [ ] Google Cloud Console has `app.marakish.org` in authorized origins
- [ ] Browser allows popups for `app.marakish.org`
- [ ] Parent folder ID is correct in config
- [ ] User has write access to parent folder
- [ ] Google Drive API is enabled in Google Cloud Console
- [ ] OAuth consent screen is configured
- [ ] Test user is added (if in testing mode)

## 🚨 Error Messages & Meanings

| Error | Meaning | Fix |
|-------|---------|-----|
| `Origin mismatch` | Domain not authorized | Add domain to Google Cloud Console |
| `Popup blocked` | Browser blocked popup | Allow popups or sign in first |
| `403 Forbidden` | No permission to create folder | Check folder permissions |
| `404 Not Found` | Parent folder doesn't exist | Verify parent folder ID |
| `idpiframe_initialization_failed` | Google API init failed | Check API key and client ID |

## 💡 Quick Fix: Skip Drive Creation

If Google Drive is causing issues, the code has a fallback:

1. When sign-in fails, a confirmation dialog appears:
   ```
   Google Drive Sign-in failed: [error message]
   
   Do you want to continue creating the vehicle WITHOUT Google Drive folders?
   ```

2. Click **OK** to proceed without folders
3. Vehicle will be created with empty `picsUrl` and `docsUrl`
4. You can manually create folders later

## 🎯 Manual Testing Steps

1. **Clear browser cache** and reload
2. **Sign out** from Google Drive if signed in
3. **Purchase a test vehicle**:
   - Serial will be auto-generated (e.g., VL1525)
   - Use test data for all fields
4. **Watch for sign-in popup**
5. **Grant permissions** when prompted
6. **Check console** for success/error messages
7. **Verify in Google Drive** that folders were created
8. **Check Firestore** for URLs

## 📊 Success Indicators

✅ **Console shows**: "Google Drive folders created successfully"
✅ **Firestore has**: Valid `picsUrl` and `docsUrl`
✅ **Google Drive has**: New folder with Pics and Docs subfolders
✅ **No alert**: No error alert appears

## ❌ Failure Indicators

❌ **Console shows**: "Error creating Google Drive folders"
❌ **Alert appears**: "[v3-Fix] Vehicle purchased, but Drive folder creation failed"
❌ **Firestore has**: Empty `picsUrl` and `docsUrl`
❌ **Google Drive**: No new folder created

---

**Next Steps**: 
1. Test on production (`app.marakish.org`)
2. Check console for specific error
3. Report back the exact error message
4. I'll provide targeted fix based on the error

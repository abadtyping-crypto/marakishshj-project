# Google Drive Integration Setup Guide

## Overview
This guide will help you set up Google Drive API integration for automatically creating vehicle folders when purchasing vehicles.

## What This Does
When you purchase a vehicle, the system will:
1. Create a main folder in Google Drive named: `{serialNumber} - {manufacturer} {model} {year}` (e.g., "VL1524 - Nissan Sunny 2024")
2. Create two subfolders inside: "Pics" and "Docs"
3. Store the URLs of these subfolders in Firestore (`picsUrl` and `docsUrl`)

All folders are created under the parent folder:
- **Folder Name**: List of Vehicle
- **Folder ID**: `17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8`
- **URL**: https://drive.google.com/drive/folders/17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8

## Setup Steps

### 1. Create/Access Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (use the same account that owns the Drive folder)
3. Either create a new project or select your existing project:
   - To create new: Click the project dropdown → "NEW PROJECT"
   - Name it something like "Marakish Vehicle Management"
   - Click "CREATE"

### 2. Enable Google Drive API

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click on "Google Drive API"
4. Click **ENABLE**

### 3. Create OAuth 2.0 Credentials

#### Step 3a: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **Internal** (if your organization uses Google Workspace) or **External**
3. Fill in the required fields:
   - **App name**: Marakish Vehicle Management
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Click **SAVE AND CONTINUE**
5. On the Scopes page, click **ADD OR REMOVE SCOPES**
6. Filter for "Google Drive API" and select:
   - `.../auth/drive.file` (View and manage Google Drive files and folders created with this app)
7. Click **UPDATE** → **SAVE AND CONTINUE**
8. If External, add test users (add your email and any other users who will use the app)
9. Click **SAVE AND CONTINUE**

#### Step 3b: Create OAuth Client ID

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth Client ID**
3. Select **Application type**: **Web application**
4. Name it: "Marakish Web Client"
5. Under **Authorized JavaScript origins**, add:
   - `http://localhost:5173` (for local development)
   - `https://your-production-domain.com` (your production URL)
6. Under **Authorized redirect URIs**, add:
   - `http://localhost:5173` (for local development)
   - `https://your-production-domain.com` (your production URL)
7. Click **CREATE**
8. **IMPORTANT**: Copy the **Client ID** (it looks like: `123456789-abc...xyz.apps.googleusercontent.com`)
9. Click **OK**

### 4. Create API Key (Optional but Recommended)

1. Still in **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **API key**
3. Copy the API key
4. Click **RESTRICT KEY** to secure it:
   - Under **API restrictions**, select **Restrict key**
   - Choose **Google Drive API**
   - Under **Application restrictions**, you can add HTTP referrers:
     - `http://localhost:5173/*`
     - `https://your-production-domain.com/*`
5. Click **SAVE**

### 5. Update Configuration File

1. Open the file: `src/config/google-drive-config.ts`
2. Replace the placeholder values:

```typescript
export const GOOGLE_DRIVE_CONFIG = {
  // Paste your API Key here (if you created one, otherwise leave empty string '')
  apiKey: 'YOUR_API_KEY_HERE',
  
  // Paste your Client ID here
  clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  
  // These remain the same
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  scope: 'https://www.googleapis.com/auth/drive.file',
  parentFolderId: '17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8',
};
```

### 6. Share the Parent Folder with Your Google Account

**IMPORTANT**: Make sure the Google Drive parent folder is accessible by the Google account you'll use for authentication.

1. Go to: https://drive.google.com/drive/folders/17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8
2. Right-click the folder → **Share**
3. Add the email address you'll use for authentication
4. Give it **Editor** permission
5. Click **Send**

### 7. Test the Integration

1. Start your development server: `npm run dev`
2. Open the vehicle purchase dialog
3. On first use, you'll be prompted to sign in to Google Drive
4. Grant the necessary permissions
5. Fill in the vehicle details and click "Purchase"
6. The system will create the folders automatically
7. Check the created vehicle in Firestore - it should have `picsUrl` and `docsUrl` fields populated

## Troubleshooting

### "Failed to initialize Google Drive API"
- Check that your API Key and Client ID are correct in the config file
- Ensure Google Drive API is enabled in your Google Cloud project
- Check the browser console for detailed error messages

### "Failed to sign in to Google Drive"
- Make sure your domain is listed in the OAuth consent screen's authorized domains
- Check that redirect URIs match exactly (no trailing slashes if your config doesn't have them)
- Clear browser cache and cookies, then try again

### "Failed to create main vehicle folder"
- Ensure the parent folder ID is correct
- Verify that the authenticated user has Editor access to the parent folder
- Check that the folder hasn't been deleted or the ID changed

### Permission Issues
- Make sure you're signed in with the Google account that has access to the parent folder
- Try signing out and signing back in: The system will prompt you when needed
- Verify that the OAuth scope includes `drive.file` permission

### Folders Not Appearing
- Check the "List of Vehicle" folder: https://drive.google.com/drive/folders/17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8
- Look in Firestore to see if `picsUrl` and `docsUrl` were saved
- Check browser console for any error messages

## Security Best Practices

1. **Never commit your API keys to Git**:
   - Add `google-drive-config.ts` to `.gitignore` if it contains actual credentials
   - Consider using environment variables instead

2. **Restrict API Keys**:
   - Always use API restrictions to limit keys to Google Drive API only
   - Use HTTP referrer restrictions for production

3. **OAuth Consent Screen**:
   - Use Internal if your organization has Google Workspace
   - Keep the list of test users minimal for External apps

4. **Monitor Usage**:
   - Check [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Dashboard** to monitor API usage
   - Set up quotas and alerts if needed

## Additional Notes

- The integration only creates folders when a NEW vehicle is purchased
- If folder creation fails, the vehicle purchase will still complete (folder creation errors don't block the purchase)
- You can manually add folder URLs later by editing the vehicle in Firestore
- The `drive.file` scope only allows the app to access files/folders it created, not all Drive files

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Review the [Google Drive API documentation](https://developers.google.com/drive/api/v3/about-sdk)
3. Check the [Google Identity documentation](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow) for OAuth issues

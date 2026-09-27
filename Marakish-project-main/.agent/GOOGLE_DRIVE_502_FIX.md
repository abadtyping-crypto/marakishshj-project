# Google Drive API 502 Error - Fix Guide

## Problem Identified
```
Error: Google API Init Failed: API discovery response missing required fields.
Status: 502 Bad Gateway
```

## Root Cause
The Google Drive API discovery endpoint is failing with a 502 error. This can happen due to:
1. Google Drive API not enabled in Google Cloud Console
2. API key quota exceeded
3. Billing not enabled
4. Temporary Google service outage

## Fix Steps

### Step 1: Enable Google Drive API
1. Go to https://console.cloud.google.com/
2. Select your project: **Marakish Group**
3. Go to **APIs & Services** > **Library**
4. Search for "Google Drive API"
5. Click on it
6. Click **"ENABLE"** if not already enabled
7. Wait 1-2 minutes for it to activate

### Step 2: Check API Key Restrictions
1. Go to **APIs & Services** > **Credentials**
2. Find your API Key: `AIzaSyCDBTCwTxW5N0E0gQRePzjZelxwlFhV2Y`
3. Click on it
4. Under **API restrictions**:
   - Select "Restrict key"
   - Make sure **"Google Drive API"** is checked
5. Under **Website restrictions**:
   - Add `https://app.marakish.org/*`
   - Add `https://marakish-shj.web.app/*`
6. Click **Save**

### Step 3: Check Billing
1. Go to **Billing** in Google Cloud Console
2. Make sure billing is enabled for your project
3. Check if you have any quota issues

### Step 4: Alternative - Use Service Account (Recommended)

Instead of using API key + OAuth, use a Service Account for more reliable folder creation:

#### Create Service Account:
1. Go to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Name: `vehicle-folder-creator`
4. Grant role: **Editor** or **Storage Admin**
5. Click **Done**
6. Click on the service account
7. Go to **Keys** tab
8. Click **Add Key** > **Create new key** > **JSON**
9. Download the JSON file

#### Share Parent Folder:
1. Go to Google Drive
2. Find your parent folder (where vehicle folders are created)
3. Right-click > **Share**
4. Add the service account email (looks like: `vehicle-folder-creator@project-id.iam.gserviceaccount.com`)
5. Give it **Editor** permission
6. Click **Share**

### Step 5: Quick Test - Retry Purchase

Sometimes 502 errors are temporary. Try:
1. Wait 2-3 minutes
2. Refresh the page
3. Try purchasing again
4. If it works, the issue was temporary

### Step 6: Fallback - Skip Google Drive

If you need to purchase vehicles urgently:
1. When the error appears, click **OK** on the confirmation dialog
2. This will create the vehicle WITHOUT Google Drive folders
3. You can manually create folders later
4. Or fix the API issue and re-run folder creation

## Verification

After fixing, you should see in console:
```
✅ Starting folder creation for VL#### - Toyota Camry 2024
✅ Sign-in successful.
✅ Folder created successfully
```

Instead of:
```
❌ Error initializing Google Drive API
❌ 502 Bad Gateway
```

## Current Error Details

From your console:
- **API Key**: `AIzaSyCDBTCwTxW5N0E0gQRePzjZelxwlFhV2Y`
- **Client ID**: `412768967356-et5p4fatgfkj4id48je6nvdh0aptsol6.apps.googleusercontent.com`
- **Error**: 502 on discovery endpoint
- **Also**: 403 on iframe (secondary issue)

## Next Steps

1. **Immediate**: Check if Google Drive API is enabled
2. **Short-term**: Verify API key restrictions
3. **Long-term**: Consider switching to Service Account method

---

**Status**: API discovery endpoint returning 502 - needs Google Cloud Console configuration check

# Firebase Storage CORS Configuration Guide

## Problem
Production site shows CORS error when uploading profile pictures:
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' 
from origin 'https://app.marakish.org' has been blocked by CORS policy
```

## Solution: Configure CORS via Firebase Console

### Option 1: Firebase Console (Easiest)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **marakish-group**
3. Go to **Storage** in the left menu
4. Click on the **Rules** tab
5. Update your rules to include CORS headers:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Option 2: Using Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: **marakish-group**
3. Go to **Cloud Storage** > **Browser**
4. Find your bucket: `marakish-group.appspot.com`
5. Click the **three dots** menu > **Edit bucket permissions**
6. Add CORS configuration

### Option 3: Using gsutil (Command Line)

If you have Google Cloud SDK installed:

```bash
# Install Google Cloud SDK first if needed
# Then run:
gsutil cors set cors.json gs://marakish-group.appspot.com
```

The `cors.json` file is already created in your project root.

## Verify CORS Configuration

After applying, you can verify with:

```bash
gsutil cors get gs://marakish-group.appspot.com
```

## Quick Fix Alternative

If CORS configuration is complex, you can also:

1. Use Firebase Storage Security Rules to allow public read
2. Ensure authenticated users can write to their profile folder

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read access
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow authenticated users to upload to their profile folder
    match /profiles/{userId}/{allPaths=**} {
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## After CORS is Fixed

Run the deployment to update the production site with the new crop/zoom features:

```bash
npm run build
firebase deploy --only hosting
```

---

**Status**: CORS configuration needed before deployment will fully work.

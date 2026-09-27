---
description: Google Drive Integration for Vehicle Folder Creation
---

# Google Drive Integration Implementation

## Overview
When a vehicle is purchased, the system should automatically create a folder structure in Google Drive:
- Main folder: `{serialNumber} - {manufacturer} {model} {year}` (e.g., "VL1524 - Nissan Sunny 2024")
- Subfolders: "Pics" and "Docs"
- Store the URLs of these subfolders in Firestore (`picsUrl` and `docsUrl`)

## Parent Folder
All vehicle folders will be created under:
- Folder ID: `17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8`
- URL: https://drive.google.com/drive/folders/17e5aKh41n4kjjVAnJIwYhtF_qyzjKSM8

## Implementation Steps

### 1. Install Google API Client
```bash
npm install gapi-script @types/gapi
```

### 2. Set up Google Drive API Credentials
- Create OAuth 2.0 credentials in Google Cloud Console
- Add the client ID to the firebase configuration or environment
- Enable Google Drive API

### 3. Create Google Drive Utility
Create `src/utils/google-drive.ts` with functions to:
- Initialize GAPI client
- Create folders
- Get folder URLs

### 4. Update Vehicle Purchase Dialog
Modify `src/sections/vehicle/vehicle-purchase-dialog.tsx` to:
- Call the Drive API after creating the vehicle in Firestore
- Update the vehicle document with the folder URLs

### 5. Handle Errors Gracefully
- If folder creation fails, log the error but don't block the purchase
- Allow manual entry or retry

## Security Considerations
- Use OAuth 2.0 for authentication
- Store credentials securely
- Limit API scope to folder creation only

// Google Drive API Configuration
// Follow these steps to set up Google Drive API:
// 1. Go to Google Cloud Console: https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google Drive API from "APIs & Services" > "Library"
// 4. Go to "APIs & Services" > "Credentials"
// 5. Create OAuth 2.0 Client ID for Web Application
// 6. Add authorized JavaScript origins: http://localhost:5173, https://your-domain.com
// 7. Add authorized redirect URIs: http://localhost:5173, https://your-domain.com
// 8. Copy the Client ID and API Key below

export const GOOGLE_DRIVE_CONFIG = {
  // Your Google API Key (Create from APIs & Services > Credentials > Create credentials > API key)
  apiKey: 'AIzaSyCDBTCwTxW5N0E0gQRePzjZelxwlFhV2Y',

  // Your OAuth 2.0 Client ID (Create from APIs & Services > Credentials > Create credentials > OAuth Client ID)
  clientId: '412768967356-et5p4fatgfkj4id48je6nvdh0aptsol6.apps.googleusercontent.com',

  // Discovery docs for Google Drive API v3
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],

  // OAuth scopes - 'drive' allows full access, ensuring we can write to the pre-existing parent folder
  scope: 'https://www.googleapis.com/auth/drive',

  // Parent folder ID where all vehicle folders will be created
  // This is the "List of Vehicle" folder: https://drive.google.com/drive/folders/1h1SBk3TUIbFMIZX8UuG88K7IDbWDSd73
  parentFolderId: '1h1SBk3TUIbFMIZX8UuG88K7IDbWDSd73',
};

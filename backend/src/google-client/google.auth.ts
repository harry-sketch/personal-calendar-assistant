import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2({
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URL,
});

export const scopes = ["https://www.googleapis.com/auth/calendar"];

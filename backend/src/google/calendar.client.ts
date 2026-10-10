import { google } from "googleapis";
import credentails from "../../credientials.json";
import { oauth2Client } from "./google.auth.ts";

oauth2Client.setCredentials(credentails);

export const calendar = google.calendar({ version: "v3", auth: oauth2Client });

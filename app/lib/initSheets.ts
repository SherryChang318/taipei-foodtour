import { config } from "dotenv";
config({ path: ".env.local" });

import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function initializeSheets() {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const bookingsHeaders = [
    ["Submitted At (TPE)", "Tour", "Date", "Time", "Adults", "Children (free)", "Total (NTD)", "Guest Name", "Guest Email", "Guest Phone"],
  ];

  const enquiriesHeaders = [
    ["Submitted At (TPE)", "Name", "Phone", "Email", "No. of People", "Preferred Dates", "Message"],
  ];

  try {
    console.log("Initializing Bookings sheet...");
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "Bookings!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: bookingsHeaders },
    });
    console.log("✓ Bookings headers written");

    console.log("Initializing Enquiries sheet...");
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "Enquiries!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: enquiriesHeaders },
    });
    console.log("✓ Enquiries headers written");

    console.log("✓ Sheet initialization complete");
  } catch (error) {
    console.error("Error initializing sheets:", error);
    process.exit(1);
  }
}

initializeSheets();

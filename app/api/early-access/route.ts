import { Resend } from "resend";
import { appendToSheet } from "@/app/lib/googleSheets";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email } = body;

    if (!email || typeof email !== "string" || email.trim() === "") {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Asia/Taipei" });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Day Tour Early Access Sign-up</h2>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
      </div>
    `;

    // Send email to admin
    await resend.emails.send({
      from: "Sherry Food Tour <noreply@sherrychang318.com>",
      to: process.env.RECIPIENT_EMAIL!,
      subject: "📩 New Day Tour Early Access Sign-up",
      html: emailHtml,
    });

    // Log to Google Sheets
    try {
      await appendToSheet("Early Access (DayTour)", [timestamp, trimmedEmail]);
    } catch (err) {
      console.error("[Sheets] Early Access append failed:", err);
    }

    return Response.json(
      { success: true, message: "Sign-up received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Early Access] Error:", error);
    return Response.json(
      { success: false, message: "Failed to process sign-up. Please try again." },
      { status: 500 }
    );
  }
}

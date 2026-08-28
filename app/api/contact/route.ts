import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation";
import { appendToSheet } from "@/app/lib/googleSheets";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = contactFormSchema.parse(body);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Tour Enquiry</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone}</p>
        <p><strong>Number of People:</strong> ${validatedData.numberOfPeople}</p>
        <p><strong>Preferred Dates:</strong> ${validatedData.dates}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Thank You for Your Enquiry!</h2>
        <p>Hi ${validatedData.name},</p>
        <p>We've received your enquiry and we're excited to help you plan the perfect food tour experience in Taipei.</p>
        <p>Our team will review your details and get back to you within 24 hours with personalized recommendations and booking options.</p>
        <p>In the meantime, feel free to reach out if you have any immediate questions.</p>
        <p>Best regards,<br>Sherry's Food Tour Team</p>
      </div>
    `;

    // Send email to admin
    await resend.emails.send({
      from: "Sherry Food Tour <noreply@sherrychang318.com>",
      to: process.env.RECIPIENT_EMAIL!,
      subject: `New Tour Enquiry from ${validatedData.name}`,
      html: emailHtml,
    });

    // Log to Google Sheets
    try {
      await appendToSheet("Enquiries", [
        new Date().toLocaleString("en-GB", { timeZone: "Asia/Taipei" }),
        validatedData.name,
        validatedData.phone,
        validatedData.email,
        validatedData.numberOfPeople,
        validatedData.dates,
        validatedData.message ?? "",
      ]);
    } catch (err) {
      console.error("[Sheets] Enquiry append failed:", err);
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: "Sherry Food Tour <noreply@sherrychang318.com>",
        to: validatedData.email,
        subject: "We received your Sherry's Food Tour enquiry",
        html: confirmationHtml,
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }

    return Response.json(
      { success: true, message: "Enquiry received. Check your email for confirmation." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      return Response.json(
        { success: false, message: "Validation failed", errors: (error as any).errors },
        { status: 400 }
      );
    }

    return Response.json(
      { success: false, message: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}

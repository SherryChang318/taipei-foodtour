import { Resend } from "resend";
import { bookingFormSchema } from "@/lib/validation";
import { appendToSheet } from "@/app/lib/googleSheets";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = bookingFormSchema.parse(body);

    const totalParticipants = validatedData.adults + validatedData.childrenFree;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Booking Confirmation</h2>
        <p><strong>Guest Name:</strong> ${validatedData.guestName}</p>
        <p><strong>Guest Email:</strong> ${validatedData.guestEmail}</p>
        ${validatedData.guestPhone ? `<p><strong>Guest Phone:</strong> ${validatedData.guestPhone}</p>` : ""}
        <p><strong>Tour:</strong> ${validatedData.tour}</p>
        <p><strong>Date:</strong> ${validatedData.date}</p>
        <p><strong>Time:</strong> ${validatedData.time}</p>
        <p><strong>Participants:</strong></p>
        <ul>
          <li>Adults (Age 5+): ${validatedData.adults}</li>
          <li>Children (Under 5): ${validatedData.childrenFree}</li>
          <li>Total: ${totalParticipants}</li>
        </ul>
        <p><strong>Total Price:</strong> US$${validatedData.total}</p>
        ${validatedData.message ? `<p><strong>Message:</strong> ${validatedData.message}</p>` : ""}
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Your Booking is Confirmed!</h2>
        <p>Thank you for booking with Sherry's Food Tour!</p>
        <h3>Booking Details</h3>
        <p><strong>Tour:</strong> ${validatedData.tour}</p>
        <p><strong>Date:</strong> ${validatedData.date}</p>
        <p><strong>Time:</strong> ${validatedData.time}</p>
        <p><strong>Participants:</strong> ${totalParticipants}</p>
        <p><strong>Total:</strong> US$${validatedData.total}</p>
        ${validatedData.message ? `<p><strong>Your message:</strong> ${validatedData.message}</p>` : ""}
        <p>Our guide will reach out within 24 hours with meeting point details and any additional information you need.</p>
        <p>If you have any questions, don't hesitate to contact us at sherrychang813@gmail.com or +886 975 724 127 on WhatsApp.</p>
        <p>Looking forward to sharing an amazing food experience with you!</p>
        <p>Best regards,<br>Sherry's Food Tour Team</p>
      </div>
    `;

    // Send email to admin
    await resend.emails.send({
      from: "Sherry Food Tour <onboarding@resend.dev>",
      to: process.env.RECIPIENT_EMAIL!,
      subject: `New Booking: ${validatedData.tour} on ${validatedData.date}`,
      html: emailHtml,
    });

    // Log to Google Sheets
    try {
      await appendToSheet("Bookings", [
        new Date().toLocaleString("en-GB", { timeZone: "Asia/Taipei" }),
        validatedData.tour,
        validatedData.date,
        validatedData.time,
        validatedData.adults,
        validatedData.childrenFree,
        validatedData.total,
        validatedData.guestName,
        validatedData.guestEmail,
        validatedData.guestPhone ?? "",
      ]);
    } catch (err) {
      console.error("[Sheets] Booking append failed:", err);
    }

    // Send confirmation email to guest
    try {
      await resend.emails.send({
        from: "Sherry Food Tour <onboarding@resend.dev>",
        to: validatedData.guestEmail,
        subject: "Your Sherry's Food Tour Booking is Confirmed",
        html: confirmationHtml,
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }

    return Response.json(
      { success: true, message: "Booking confirmed. Check your email for details." },
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
      { success: false, message: "Failed to process booking. Please try again." },
      { status: 500 }
    );
  }
}

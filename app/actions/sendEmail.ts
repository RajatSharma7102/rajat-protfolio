"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailResult {
  success: boolean;
  data?: {
    id: string;
  };
  error?: string;
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  const senderEmail = formData.get("senderEmail") as string;
  const senderName = formData.get("senderName") as string;
  const message = formData.get("message") as string;

  if (!senderEmail || !message) {
    return {
      success: false,
      error: "Email and message are required.",
    };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Chat <onboarding@resend.dev>",
      to: "chanderkantsharma12344@gmail.com", // Your email from the .env.local
      subject: `New Chat Message from ${senderName || senderEmail}`,
      replyTo: senderEmail,
      text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📨 New Message from Portfolio Chat
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 From: ${senderName || "Not provided"}
📧 Email: ${senderEmail}

💬 Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px;">
          <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; border: 1px solid rgba(255,255,255,0.1);">
            <h1 style="color: #fff; margin: 0 0 20px 0; font-size: 24px; display: flex; align-items: center; gap: 8px;">
              📨 New Message from Portfolio Chat
            </h1>
            
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <p style="color: rgba(255,255,255,0.7); margin: 0 0 8px 0; font-size: 14px;">
                <strong style="color: #fff;">👤 From:</strong> ${senderName || "Not provided"}
              </p>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">
                <strong style="color: #fff;">📧 Email:</strong> <a href="mailto:${senderEmail}" style="color: #60a5fa;">${senderEmail}</a>
              </p>
            </div>
            
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 16px;">
              <p style="color: rgba(255,255,255,0.7); margin: 0 0 8px 0; font-size: 14px;">
                <strong style="color: #fff;">💬 Message:</strong>
              </p>
              <p style="color: #fff; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    return { success: true, data: { id: data.data?.id || "" } };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email. Please try again.",
    };
  }
}

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
  smtp: {
    host: string;
    port: number;
    email: string;
    password: string;
    fromName: string;
    secure: boolean;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, text, smtp }: EmailRequest = await req.json();

    console.log(`Attempting to send email to: ${to}`);
    console.log(`SMTP Host: ${smtp.host}, Port: ${smtp.port}`);

    // Validate required fields
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, html" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!smtp.host || !smtp.email || !smtp.password) {
      return new Response(
        JSON.stringify({ error: "Missing SMTP configuration" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: smtp.host,
        port: smtp.port || 587,
        tls: smtp.secure,
        auth: {
          username: smtp.email,
          password: smtp.password,
        },
      },
    });

    // Send email
    await client.send({
      from: `${smtp.fromName || "Website"} <${smtp.email}>`,
      to: to,
      subject: subject,
      content: text || "",
      html: html,
    });

    await client.close();

    console.log(`Email sent successfully to: ${to}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

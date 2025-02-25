const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  // Define CORS headers once to reuse
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://www.sebastianmateus.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204, // Use 204 for OPTIONS
      headers: corsHeaders,
      body: null
    };
    return;
  }

  // Add debug logging
  context.log('Request method:', req.method);
  context.log('Request headers:', req.headers);
  context.log('Request body:', req.body);
  
  try {
    // Validate request
    if (!req.body || !req.body.name || !req.body.email || !req.body.subject || !req.body.message) {
      context.res = {
        status: 400,
        headers: corsHeaders,
        body: "Please provide name, email, subject and message in the request body."
      };
      return;
    }

    // Extract form data
    const { name, email, subject, message } = req.body;
    
    // Create a transporter object using ProtonMail SMTP settings
    let transporter = nodemailer.createTransport({
      host: 'smtp.protonmail.ch',  // Use the exact server provided by ProtonMail
      port: 587,                   // Use port 587 for STARTTLS
      secure: false,               // Set secure to false to allow an upgrade via STARTTLS
      requireTLS: true,            // Force a TLS upgrade after connecting
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    
    // Define the email options
    const mailOptions = {
      // Set the "from" field to your verified email
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      // Use the user's email as reply-to
      replyTo: email,
      // Send to your authenticated email
      to: process.env.EMAIL_USER,
      subject: subject || 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong><br>${message}</p>`
    };
    
    // Attempt to send the email
    let info = await transporter.sendMail(mailOptions);
    context.log('Email sent:', info.response);
    context.res = {
      status: 200,
      headers: corsHeaders,
      body: "Email sent successfully!"
    };
  } catch (error) {
    context.log.error('Detailed error:', error);
    context.res = {
      status: 500,
      headers: corsHeaders,
      body: `Error sending email: ${error.message}`
    };
  }
};

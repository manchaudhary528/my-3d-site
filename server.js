import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Resend requires an API key, which must be stored in .env as EMAIL_API_KEY
const resend = new Resend(process.env.EMAIL_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!process.env.EMAIL_API_KEY) {
    console.error("EMAIL_API_KEY is not set in the environment variables.");
    return res.status(500).json({ error: 'Email service is not configured. Please contact the administrator.' });
  }

  try {
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    if (!receiverEmail) {
      console.warn("CONTACT_RECEIVER_EMAIL is not set in environment variables. Using a fallback for testing.");
    }
    
    // Resend requires the sender email to be from a verified domain, or onboarding@resend.dev for testing
    const senderEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev'; 

    const data = await resend.emails.send({
      from: `Portfolio Contact <${senderEmail}>`,
      to: receiverEmail ? [receiverEmail] : ['delivered@resend.dev'], // Use recipient from .env
      replyTo: email, // Use visitor's email as the reply-to
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      console.error('Email API Error:', data.error);
      return res.status(500).json({ error: 'Failed to send email. Provider rejected the request.' });
    }

    console.log('Email sent successfully:', data.data);
    res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred while sending the email.' });
  }
});

app.listen(port, () => {
  console.log(`API Server running on port ${port}`);
});

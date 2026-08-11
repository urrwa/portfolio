/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables from .env.local if present, otherwise fallback to .env
const envPath = fs.existsSync(path.resolve(process.cwd(), '.env.local'))
  ? path.resolve(process.cwd(), '.env.local')
  : path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

function areEmailEnvVarsMissing() {
  return !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM || !EMAIL_TO;
}

async function sendContactEmail(name: string, email: string, message: string) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `New message from ${name} <${email}>:\n\n${message}`,
    html: `
      <h2>Portfolio Contact Form</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  });
}

// Ensure the Gemini client is initialized securely server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request body parsing
  app.use(express.json());

  // API 1: Gemini creative assistant & playground endpoint
  app.post('/api/gemini/generate', async (req, res) => {
    try {
      const { prompt, type } = req.body;

      if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      // Design specific system instructions based on playground mode
      let systemInstruction = "You are Urwa Imtiaz's AI Portfolio Assistant, an expert web designer, prompt hacker, and data scientist.";
      if (type === 'design') {
        systemInstruction = "You are an AI Web Design Generator. When given a prompt, generate 3 highly creative, hand-drawn layout concepts with specific details on color palette, visual hierarchy, and key interactive elements.";
      } else if (type === 'sketch') {
        systemInstruction = "You are a Creative Sketch Assistant. Convert the user's idea into a simple, beautiful ASCII art wireframe or step-by-step layout design using simple pencil character strokes.";
      } else if (type === 'analytics') {
        systemInstruction = "You are a predictive data statistics analyst. Synthesize a mock agricultural or financial regression insight based on the user's focus keywords, highlighting trends and standard errors.";
      }

      // Call the recommended Gemini model
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.8,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini call failure:', error);
      res.status(500).json({ error: 'Failed to generate AI response. Make sure GEMINI_API_KEY is configured in Secrets.' });
    }
  });

  // API 2: Contact form sending receiver
  app.post('/api/contact/send', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }

      console.log(`[Form Received]: Name: ${name}, Email: ${email}, Msg: ${message}`);

      if (areEmailEnvVarsMissing()) {
        console.error('Missing SMTP environment variables for contact form email delivery.');
        res.status(500).json({ error: 'Email service is not configured. Please set SMTP environment variables.' });
        return;
      }

      await sendContactEmail(name, email, message);
      res.json({ success: true, message: 'Your paper airplane reached Urwa!' });
    } catch (error) {
      console.error('Contact email send failure:', error);
      res.status(500).json({ error: 'Unable to send your message right now. Please try again later.' });
    }
  });

  // Integrate Vite's middleware pipeline for local development, fallback static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-stack server running securely on http://localhost:${PORT}`);
  });
}

startServer();

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/37c29421-7b38-4d4d-9da4-e7445939495e

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a local environment file and set your keys:
   - Copy `.env.example` to `.env.local` or `.env`
   - Set `GEMINI_API_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, and `EMAIL_TO`
3. For contact form email delivery, use real SMTP credentials in `.env.local` or `.env`.
4. Restart the app after changing environment variables:
   `npm run dev`

> The local server now prefers `.env.local` when present, so your SMTP credentials will be loaded correctly.
> If you deploy to Vercel, the project now includes an `/api/contact/send` serverless function. Make sure `/api` is not rewritten to `index.html` so the email route stays reachable.


---

## License

© 2026 Urwah Imtiaz. All rights reserved.

This code, along with all artwork, hand-drawn SVGs, illustrations and audio in this repository, is not licensed for reuse, redistribution or commercial use. You are welcome to view the source and learn from it. For permission to use any part of this work, please get in touch.

# Sanskriti Clinic Website: Future Plans

## Overview

The website will evolve in stages so the current static site can remain online while backend, frontend, and support capabilities are introduced independently.

## Phase 1: Static Frontend

- Keep the current HTML, CSS, Bootstrap, and JavaScript website in `docs/`.
- Deploy the static site using Netlify or GitHub Pages.
- Connect a custom domain when it is available.

## Phase 2: Backend and Database

- Build REST APIs with Spring Boot, JPA, and PostgreSQL.
- Deploy the backend separately from the static frontend, such as on Render.
- Move appointment submission, availability, and other data-driven features to the API.
- Configure the frontend to call the backend through secure REST endpoints.

## Phase 3: Modern Frontend

- Migrate the frontend to React when the site needs richer interactions and reusable UI components.
- Deploy the React application independently, with Vercel as the preferred option.
- Keep the backend API separate so the frontend can evolve without changing backend hosting.

## Phase 4: Professional Domain and Email

- Purchase and configure a custom clinic domain.
- Configure DNS records for the chosen frontend and backend hosts.
- Set up professional email using Google Workspace or Zoho Mail.
- Configure MX records for the selected email provider.

## Phase 5: Advanced Features

- Add an appointment-assistance chatbot using Dialogflow or Botpress.
- Send appointment confirmations and notifications through a transactional email provider such as SendGrid or Mailgun.
- Consider Cloudflare Pages for CDN-focused static hosting or Firebase Hosting when closer Google ecosystem integration is useful.

## Target Architecture

```text
Patient browser
  -> Static site / React frontend (Netlify, GitHub Pages, or Vercel)
  -> REST API (Spring Boot)
  -> PostgreSQL database
  -> Email and chatbot integrations
```

## Recommended Path

1. Deploy the current static frontend on Netlify.
2. Add the Spring Boot API and PostgreSQL database on Render.
3. Migrate to React and deploy the frontend on Vercel when needed.
4. Add the custom domain, professional email, and automated support features.

## Benefits

- Frontend and backend can be updated independently.
- Each part of the application can use hosting suited to its workload.
- The clinic can adopt professional branding and support tooling incrementally.
- The architecture supports future migrations without requiring a full rebuild.


####################################################################################

Deployment Security and URL Strategy for Sanskriti Clinic Website

1. Secure Deployment Practices

Private Repositories: Keep both frontend and backend code in private GitHub repositories to prevent unauthorized access.

Vercel Deployment Options:

Connect Vercel to private GitHub repos (supported on free tier).

Alternatively, deploy directly from local machine using Vercel CLI (vercel deploy) without exposing repo.

Backend (Render):

Use private repo for Spring Boot backend.

Connect Render with GitHub access tokens for secure deployment.

Access Control:

Enable role-based access in backend.

Use environment variables for sensitive keys (API, DB credentials).

2. Short, Easy-to-Remember URLs

Default Vercel URL: https://projectname.vercel.app

Custom Project Name: Rename project in Vercel to get a clean subdomain (e.g., https://sanskriti.vercel.app).

Backend URL: Render provides https://projectname.onrender.com (e.g., https://sanskriti-api.onrender.com).

Future Domain Migration:

Purchase domain (e.g., sanskriticlinic.com).

Point DNS to Vercel (frontend) and Render (backend).

Old Vercel/Render URLs remain functional but you promote the custom domain.

3. Suggested Deployment Path

Frontend (Vercel): Private repo or CLI deploy → short project name → sanskriti.vercel.app.

Backend (Render): Private repo → deploy APIs → sanskriti-api.onrender.com.

Cross-Platform Integration: Frontend calls backend via API endpoints.

Future Domain: sanskriticlinic.com → mapped to both frontend and backend.

Email: Google Workspace or Zoho Mail once domain is live.

4. Benefits

Security: Code remains private, deployments controlled.

Professionalism: Short, clean URLs now; custom domain later.

Scalability: Smooth migration to domain without breaking existing URLs.

Flexibility: Separate frontend and backend hosting for better control.

5. Checklist for Codex Implementation

Convert repos to private.

Configure Vercel project name → sanskriti.vercel.app.

Deploy backend on Render → sanskriti-api.onrender.com.

Ensure frontend calls backend via HTTPS endpoints.

Plan DNS mapping for future domain.

Prepare MX records for professional email setup.

Final Recommendation

Use Vercel for frontend with private repo and short project name.

Use Render for backend with private repo.

Plan for custom domain + email integration later.

This ensures secure, professional, and scalable deployment from day one.

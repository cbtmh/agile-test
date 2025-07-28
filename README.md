# Agile Test Project - Frontend

This is the frontend application for the Agile Test Project, built with React, TypeScript, and Vite.

## Environment Setup

1. Copy `.env.example` to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your API URLs:
   ```
   VITE_AUTH_API_URL=your_auth_api_url
   VITE_POST_API_URL=your_post_api_url
   VITE_GALLERY_API_URL=your_gallery_api_url
   ```

## Features

- User authentication (Login/Profile)
- Home page with multiple sections:
  - Intro section
  - Feature section
  - Information section
  - Testimonial section
- Protected routes
- Responsive layout with Header and Footer
- API integration with backend services

## Project Structure

```
src/
├── assets/          # Static assets (CSS, images)
├── components/      # Reusable components
│   ├── hooks/       # Custom React hooks
│   ├── layout/      # Layout components
│   ├── sections/    # Page sections
│   ├── ui/          # UI components
│   └── utils/       # Utility components
├── configs/         # Configuration files
├── pages/          # Page components
├── routes/         # Routing configuration
├── services/       # API services

```

## Getting Started

1. Install dependencies:
   ```bash
   npm create vite@latest
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Technical Stack

- React
- TypeScript
- Vite
- React Router for navigation
- API integration with backend services


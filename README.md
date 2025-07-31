# Legacy Book - Memory Journal Application

A Next.js application for creating and managing personal memories with images, moods, and timestamps.

## Features

- 📝 Create, edit, and delete memories
- 🖼️ Upload and preview images (using Cloudinary)
- 😊 Add mood emojis to memories
- 🔍 Search through memories by name, title, or message
- 🌓 Dark/Light theme toggle
- 💾 Local storage persistence
- 📱 Responsive grid layout

## Tech Stack

- [Next.js 15.4](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Cloudinary](https://cloudinary.com/) - Image hosting
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Cloudinary account for image uploads

## Environment Setup

Create a `.env` file in the root directory:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📸 Screenshots

### 🧱 Memory Cards Overview
![LegacyBook UI]("https://github.com/user-attachments/assets/370b140a-aaf9-4897-af31-a2bb7bf9d655")
![LegacyBook UI]("https://github.com/user-attachments/assets/7bc6672c-d49b-40a6-949d-3236ef269d0e")

This screen shows the list of memories with mood emojis, images, titles, and messages. Supports light/dark theme, search, and persistent local storage.


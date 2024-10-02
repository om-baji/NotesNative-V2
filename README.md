# Notes Native

Notes Native is a minimalistic and responsive note-taking application built with **Next.js**, featuring full CRUD (Create, Read, Update, Delete) functionality. It uses **NextAuth** for authentication via **Google** and **GitHub** OAuth providers, and leverages **Next.js Server Actions** instead of traditional API routes for better performance.

## Features

- **Create, Read, Update, Delete (CRUD)** operations for notes
- **OAuth Authentication** via Google and GitHub using NextAuth
- **Next.js** framework for server-side rendering and seamless routing
- **Server Actions** for direct interactions with the database, eliminating the need for API routes
- **Responsive Design** optimized for both mobile and desktop
- **Dark and Orange theme** for a minimalistic, notes-like experience similar to Apple or Samsung Notes

## Tech Stack

- **Next.js** - React framework with server-side rendering
- **Tailwind CSS** - Utility-first CSS framework for responsive and minimal UI
- **Prisma** - ORM for database management
- **NextAuth** - Authentication library for handling OAuth with Google and GitHub
- **TypeScript** - Strongly typed JavaScript for reliable development
- **Debian/Windows Subsystem for Linux** (WSL) for development environment

## Setup and Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm or yarn
- Git
- Google and GitHub OAuth credentials (Client ID and Client Secret)

### Clone the Repository

```bash
git clone https://github.com/om-baji/NotesNative-V2.git
cd NotesNative-V2

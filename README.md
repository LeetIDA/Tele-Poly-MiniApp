# Student Database - Telegram Mini App

A modern, clean, and private student database search application built as a Telegram Mini App. Features a dark, Apple-inspired design with smooth animations and instant search capabilities.

## Features

- 🔍 **Fast Search** - Search by Student ID or Name with instant results
- 🎨 **Modern Dark UI** - Clean, minimal design inspired by Apple aesthetics
- 🔐 **Private & Secure** - Access restricted to authorized users only
- 📱 **Telegram Native** - Built specifically for Telegram Mini Apps
- ⚡ **Real-time Database** - Powered by LibSQL (Turso) for lightning-fast queries
- 🖼️ **Profile Pictures** - Displays student photos when available
- 📊 **Comprehensive Info** - View complete student profiles with all details

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui components
- **Database**: LibSQL (Turso) - Read-only access
- **Icons**: Lucide React
- **Platform**: Telegram WebApp SDK

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn)
│   ├── SearchBar.tsx    # Search input component
│   ├── StudentCard.tsx  # Student list item
│   └── StudentProfile.tsx # Full student profile view
├── services/
│   ├── telegram.ts      # Telegram WebApp integration
│   ├── database.ts      # LibSQL/Turso database service
│   ├── auth.ts          # User authorization
│   └── api.ts           # HTTP client
├── types/
│   ├── student.ts       # Student data types
│   └── telegram.ts      # Telegram WebApp types
├── hooks/
│   └── useTelegram.ts   # Telegram WebApp hook
└── lib/
    └── utils.ts         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Telegram account

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Database Configuration

The app connects to a LibSQL (Turso) database with the following configuration:

- **URL**: `libsql://polytechnic-2025-leetida.aws-us-east-2.turso.io`
- **Access**: Read-only
- **Table**: `students`

### Student Table Schema

| Column | Type | Description |
|--------|------|-------------|
| STUDENT_ID | TEXT | Primary Key |
| E_NAME | TEXT | Student Name |
| CPR_NO | TEXT | CPR Number |
| PB_EMAIL | TEXT | Polytechnic Email |
| MOBILE | TEXT | Mobile Number |
| GENDER | TEXT | Gender |
| BDATE | TEXT | Birth Date |
| CITIZENSHIP | TEXT | Citizenship |
| PROFILE_PICTURE | TEXT | Profile Picture URL |
| COLLEGE | TEXT | College |
| MAJR1 | TEXT | Major |
| PERS_EMAIL | TEXT | Personal Email |
| SPRADDR_* | TEXT | Address Fields |

## Authorization

Access is restricted to authorized Telegram users only. To add authorized users:

1. Open [src/services/auth.ts](src/services/auth.ts)
2. Add Telegram user IDs to the `ALLOWED_USER_IDS` array:

```typescript
const ALLOWED_USER_IDS: number[] = [
  123456789, // Your Telegram user ID
  987654321, // Another authorized user
];
```

3. Set `import.meta.env.DEV` check to false in production

### Finding Your Telegram User ID

1. Open [@userinfobot](https://t.me/userinfobot) in Telegram
2. Send any message
3. The bot will reply with your user ID

## Telegram Mini App Setup

1. Create a bot with [@BotFather](https://t.me/BotFather)
2. Use `/newapp` command to create a Mini App
3. Set the app URL to your deployed URL
4. Configure app icon and description
5. Test in Telegram

## Design Philosophy

This app follows a **clean, minimal, Apple-inspired** design:

- Dark theme by default
- Smooth animations and transitions
- Clean typography with SF Pro Display fallback
- Ample whitespace
- Subtle shadows and borders
- Focus on content over decoration
- No emoji clutter

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

### Key Components

#### SearchBar
Real-time search with debouncing. Searches both Student ID and Name fields.

#### StudentCard
Compact card showing student summary with profile picture, name, ID, and major.

#### StudentProfile
Full-screen profile view with all student information organized by category:
- Academic Information
- Personal Information
- Contact Information
- Address

## Deployment

Deploy the `dist` folder to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Make sure to:
1. Update authorized user IDs in production
2. Disable development mode in auth service
3. Test Telegram WebApp integration

## Security Notes

- Database credentials are for **read-only** access
- User authorization is checked on app load
- No sensitive data modification is possible
- All database queries are parameterized to prevent SQL injection

## License

MIT

## Resources

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [LibSQL/Turso Documentation](https://docs.turso.tech)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

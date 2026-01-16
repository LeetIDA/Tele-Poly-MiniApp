# Quick Start Guide

## 🚀 Running the App

```bash
npm run dev
```

App will be available at: http://localhost:5173

## 🔐 Adding Authorized Users

1. Open `src/services/auth.ts`
2. Add Telegram user IDs to the array:

```typescript
const ALLOWED_USER_IDS: number[] = [
  123456789,  // Replace with actual Telegram user IDs
];
```

3. To find your Telegram user ID:
   - Open [@userinfobot](https://t.me/userinfobot)
   - Send any message
   - Bot replies with your user ID

## 📱 Telegram Bot Setup

1. Go to [@BotFather](https://t.me/BotFather)
2. Create a new bot: `/newbot`
3. Create Mini App: `/newapp`
4. Set app URL to your deployed URL (or use ngrok for testing)
5. Add icon and description
6. Open the app in Telegram to test

## 🔧 Production Deployment

1. Build the app:
```bash
npm run build
```

2. Deploy `dist` folder to:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - Cloudflare Pages

3. **Important**: Update `src/services/auth.ts` for production:
   - Comment out `if (import.meta.env.DEV) return true;`
   - Add actual authorized user IDs
   - Deploy updated version

## 🎨 Customization

### Colors
Edit `src/index.css` - CSS variables at the top

### Database
Edit `src/services/database.ts` if you need to change queries

### Search Behavior
Edit `src/components/SearchBar.tsx` - change debounce delay (currently 300ms)

## 📝 Database Info

- **URL**: libsql://polytechnic-2025-leetida.aws-us-east-2.turso.io
- **Table**: students
- **Access**: Read-only
- **Search fields**: STUDENT_ID, E_NAME

## 🐛 Troubleshooting

### App shows "Not Available"
- Open app inside Telegram
- Can't test outside Telegram in production
- Use dev mode for browser testing

### No search results
- Check database connection
- Verify table name and columns match
- Check browser console for errors

### Profile pictures not loading
- Verify PROFILE_PICTURE URLs are valid
- Check CORS settings if images are from external sources
- Fallback user icon will show if image fails

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/                   # shadcn components
│   ├── SearchBar.tsx         # Search input
│   ├── StudentCard.tsx       # List item
│   └── StudentProfile.tsx    # Full profile view
├── services/
│   ├── auth.ts              # ✏️ Edit this for user access
│   ├── database.ts           # Database queries
│   └── telegram.ts           # Telegram integration
├── types/
│   └── student.ts            # Student data types
└── App.tsx                   # Main app logic
```

## 🔗 Important Links

- [Telegram Mini Apps Docs](https://core.telegram.org/bots/webapps)
- [Turso Database](https://turso.tech)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

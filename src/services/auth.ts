// Authorized Telegram user IDs - Only these users can search
const ALLOWED_USER_IDS: number[] = [
  Number(import.meta.env.VITE_ADMIN_ID),
  Number(import.meta.env.VITE_USER_ID_2),
  Number(import.meta.env.VITE_USER_ID_3)
];

// Admin ID to receive unauthorized access logs
const ADMIN_ID = Number(import.meta.env.VITE_ADMIN_ID);
const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;

export const isUserAuthorized = (userId: number | undefined): boolean => {
  if (!userId) return false;
  return ALLOWED_USER_IDS.includes(userId);
};

export const isSearchAuthorized = (userId: number | undefined): boolean => {
  if (!userId) return false;
  return ALLOWED_USER_IDS.includes(userId);
};

export const getAuthErrorMessage = (): string => {
  return 'Access Denied: You are not authorized to use this application.';
};

export const getSearchErrorMessage = (): string => {
  return 'Access Denied: You are not authorized to perform searches.';
};

export const logUnauthorizedSearch = async (
  userId: number | undefined,
  username: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  searchQuery: string
) => {
  try {
    const userInfo = [
      `User ID: ${userId || 'Unknown'}`,
      `Username: @${username || 'None'}`,
      `Name: ${firstName || ''} ${lastName || ''}`.trim() || 'Unknown',
      `Search Query: "${searchQuery}"`,
      `Time: ${new Date().toLocaleString()}`
    ].join('\n');

    // Send log via Telegram Bot API
    const message = `🚨 Unauthorized Search Attempt\n\n${userInfo}`;
    
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    console.log('Unauthorized search logged:', userInfo);
  } catch (error) {
    console.error('Failed to log unauthorized search:', error);
  }
};

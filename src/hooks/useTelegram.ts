import { useEffect, useState } from 'react';
import telegramService from '@services/telegram';
import type { TelegramWebApp } from '../types/telegram';

export const useTelegram = () => {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const user = telegramService.getUserData();
  const colorScheme = telegramService.getColorScheme();

  useEffect(() => {
    const webApp = telegramService.getWebApp();
    setTg(webApp);
  }, []);

  return {
    tg,
    user,
    colorScheme,
    isAvailable: telegramService.isAvailable(),
  };
};

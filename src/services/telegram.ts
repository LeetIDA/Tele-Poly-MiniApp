import type { TelegramWebApp } from '../types/telegram';

class TelegramService {
  private tg: TelegramWebApp | null = null;

  constructor() {
    if (window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp;
      this.tg.ready();
      this.tg.expand();
      // Enable closing confirmation (optional)
      this.tg.enableClosingConfirmation();
    }
  }

  getWebApp(): TelegramWebApp | null {
    return this.tg;
  }

  isAvailable(): boolean {
    return this.tg !== null;
  }

  getUserData() {
    return this.tg?.initDataUnsafe?.user || null;
  }

  getStartParam(): string | undefined {
    return this.tg?.initDataUnsafe?.start_param;
  }

  getThemeParams() {
    return this.tg?.themeParams || null;
  }

  getColorScheme(): 'light' | 'dark' | null {
    return this.tg?.colorScheme || null;
  }

  showMainButton(text: string, onClick: () => void) {
    if (this.tg?.MainButton) {
      this.tg.MainButton.setText(text);
      this.tg.MainButton.show();
      this.tg.MainButton.onClick(onClick);
    }
  }

  hideMainButton() {
    this.tg?.MainButton.hide();
  }

  showBackButton(onClick: () => void) {
    if (this.tg?.BackButton) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(onClick);
    }
  }

  hideBackButton() {
    this.tg?.BackButton.hide();
  }

  showAlert(message: string, callback?: () => void) {
    this.tg?.showAlert(message, callback);
  }

  showConfirm(message: string, callback?: (confirmed: boolean) => void) {
    this.tg?.showConfirm(message, callback);
  }

  hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'medium') {
    this.tg?.HapticFeedback.impactOccurred(type);
  }

  close() {
    this.tg?.close();
  }

  openLink(url: string) {
    this.tg?.openLink(url);
  }

  sendData(data: string) {
    this.tg?.sendData(data);
  }
}

export default new TelegramService();

import type { TelegramWebApp } from '../types/telegram';

class TelegramService {
  private tg: TelegramWebApp | null = null;

  constructor() {
    if (window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp;
      
      // Initialize the app
      this.tg.ready();
      
      // Expand to full height
      this.tg.expand();
      
      // Request fullscreen mode (v8.0+)
      this.requestFullscreen();
      
      // Enable closing confirmation
      this.tg.enableClosingConfirmation();
      
      // Set viewport height CSS variable
      this.updateViewportHeight();
      
      // Listen for viewport changes
      this.tg.onEvent('viewportChanged', () => this.updateViewportHeight());
    }
  }

  private updateViewportHeight() {
    if (this.tg?.viewportHeight) {
      document.documentElement.style.setProperty(
        '--tg-viewport-height',
        `${this.tg.viewportHeight}px`
      );
    }
  }

  private requestFullscreen() {
    try {
      // Use native Telegram method if available (v8.0+)
      if (this.tg && 'requestFullscreen' in this.tg && typeof (this.tg as any).requestFullscreen === 'function') {
        (this.tg as any).requestFullscreen();
      } else {
        // Fallback: Use postEvent for older SDK versions
        if ((window as any).TelegramWebviewProxy?.postEvent) {
          (window as any).TelegramWebviewProxy.postEvent('web_app_request_fullscreen', '{}');
        } else if (window.parent) {
          // Web version fallback
          window.parent.postMessage(
            JSON.stringify({
              eventType: 'web_app_request_fullscreen',
              eventData: {}
            }),
            'https://web.telegram.org'
          );
        }
      }
    } catch (error) {
      console.log('Fullscreen request not supported:', error);
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

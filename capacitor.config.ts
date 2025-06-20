
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c59ea44c25104d7aa485489507fcfde6',
  appName: 'Groovia',
  webDir: 'dist',
  server: {
    url: 'https://c59ea44c-2510-4d7a-a485-489507fcfde6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#10b981',
      showSpinner: false
    }
  }
};

export default config;

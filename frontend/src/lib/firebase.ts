import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let analytics: Analytics | null = null;

if (firebaseConfig.apiKey && typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { analytics };

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

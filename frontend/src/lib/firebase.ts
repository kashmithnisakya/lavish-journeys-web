import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4AKc9gO_ZiFfRrZKKCPjaBjE8LTus__g",
  authDomain: "lavishtravelsandtours-19256.firebaseapp.com",
  projectId: "lavishtravelsandtours-19256",
  storageBucket: "lavishtravelsandtours-19256.firebasestorage.app",
  messagingSenderId: "205178329813",
  appId: "1:205178329813:web:bec542d6bd92df4f23605c",
  measurementId: "G-H2S50JGGZR",
};

const app = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };

export function trackEvent(eventName: string, params?: Record<string, string | number>) {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

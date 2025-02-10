export const LOGO = import.meta.env.VITE_LOGO;
export const USER_AVATAR = import.meta.env.VITE_USER_AVATAR;
export const IMG_CDN_URL = import.meta.env.VITE_IMG_CDN_URL;
export const BG_URL = import.meta.env.VITE_BG_URL;

export const SUPPORTED_LANGUAGES = import.meta.env.VITE_SUPPORTED_LANGUAGES
  ? JSON.parse(import.meta.env.VITE_SUPPORTED_LANGUAGES)
  : [
      { identifier: "en", name: "English" },
      { identifier: "hindi", name: "Hindi" },
      { identifier: "spanish", name: "Spanish" },
    ];

export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization: import.meta.env.VITE_API_AUTHORIZATION,
    }
};

export const OPENAI_key = import.meta.env.VITE_OPENAI_API_KEY;

export const FIREBASE_CONFIG = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

import { initializeApp } from "firebase/app";
import { clientConfig } from "./config";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
export const app = initializeApp(clientConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

// TODO, this could probably all live in a context provider for easier access across the application

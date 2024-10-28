import { initializeApp } from "firebase/app";
import { clientConfig } from "./config";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
export const app = initializeApp(clientConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

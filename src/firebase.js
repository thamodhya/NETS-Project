import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCZbt50xsrWErZpPKGmym--ncrUNmgPakU",
    authDomain: "fileuploadtest-4dc2b.firebaseapp.com",
    projectId: "fileuploadtest-4dc2b",
    storageBucket: "fileuploadtest-4dc2b.appspot.com",
    messagingSenderId: "805190242176",
    appId: "1:805190242176:web:d220dfd549436fa0dd7b65"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

 
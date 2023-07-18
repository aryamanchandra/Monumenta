import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA7HPMtUNqRzbR8l_HSNmN0eg3Ya1SsIk8",
  authDomain: "monumenta-3f4da.firebaseapp.com",
  projectId: "monumenta-3f4da",
  storageBucket: "monumenta-3f4da.appspot.com",
  messagingSenderId: "603152655947",
  appId: "1:603152655947:web:66d7efff5625d7f5f74fce"
};

let app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
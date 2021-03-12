import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCyyqYgnM0FdWlskTHu0cmqqKiT70neoyc",
  authDomain: "auth-production-cde21.firebaseapp.com",
  projectId: "auth-production-cde21",
  storageBucket: "auth-production-cde21.appspot.com",
  messagingSenderId: "26923964541",
  appId: "1:26923964541:web:873f590abb854d9f747914"
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app

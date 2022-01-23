import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAvF13-0HA8UbBFOOHNFd8K8IHZ2iazP9s',
  authDomain: 'my-dish-4e153.firebaseapp.com',
  projectId: 'my-dish-4e153',
  storageBucket: 'my-dish-4e153.appspot.com',
  messagingSenderId: '900444932326',
  appId: '1:900444932326:web:ab847b356c529c78421327',
  measurementId: 'G-JN2FSX15MM',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const connectWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        resolve(result)
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // const user = result.user;
      }).catch((error) => {
      reject(error)
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
  })
}

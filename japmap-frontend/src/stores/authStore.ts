import { makeAutoObservable } from "mobx";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAhzH7U2hE6oluNkjNtn0W0qZgdP8Yi2hs",
  authDomain: "japmap-1d707.firebaseapp.com",
  projectId: "japmap-1d707",
  storageBucket: "japmap-1d707.firebasestorage.app",
  messagingSenderId: "494042965988",
  appId: "1:494042965988:web:83184cf9507391b63f09f1"
};

initializeApp(firebaseConfig)
const auth = getAuth();

export class AuthStore {

  user = null;

  setUser(user) {
    this.user = user
  }

  async attemptLogin(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user.user);
      this.setUser(user.user);
    })
  }

  async logout() {
    await signOut(auth).then(() => {
      this.setUser(null);
    });
  }


  constructor() {
    makeAutoObservable(this);
  }
}
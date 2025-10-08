// src/services/auth.service.js
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from './firebase'; // Precisamos do 'app' inicializado

export const auth = getAuth(app);

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
    return signOut(auth);
};
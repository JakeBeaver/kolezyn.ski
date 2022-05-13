import { writable } from 'svelte/store';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from '@firebase/auth';
import type { User } from '@firebase/auth';
import { auth, provider } from './firebaseConfig';

export const user = writable<User>();

onAuthStateChanged(auth, (u) => {
	user.set(u);
});

export const logOut = () => signOut(auth);
export const logIn = () =>
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const googleCredential = GoogleAuthProvider.credentialFromResult(result);
			// new CredentialData(result, googleCredential).save();
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});

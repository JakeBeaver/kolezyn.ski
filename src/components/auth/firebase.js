import { writable } from 'svelte/store';

import { initializeApp } from '@firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from '@firebase/auth';

const initUserState = { isLoggedIn: false, name: '', email: '', photoURL: '' }
export const user = writable(initUserState);

const firebaseConfig = {
	apiKey: 'AIzaSyBDEc9908mKjEQiDaHHEq_57xBAa2ipt44',
	authDomain: 'landing-18c1e.firebaseapp.com',
	databaseURL: 'https://landing-18c1e-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'landing-18c1e',
	storageBucket: 'landing-18c1e.appspot.com',
	messagingSenderId: '75991988600',
	appId: '1:75991988600:web:fc1b16dc183969d797308d',
	measurementId: 'G-H2CGN2RXN1'
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();
auth.languageCode = 'it';

export const logOut = () => signOut(auth).then(()=>user.set(initUserState));
export const logIn = () =>
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			console.log(result.user);
			user.set({
				isLoggedIn: true,
				name: result.user.displayName,
				email: result.user.email,
				photoURL: result.user.photoURL,
			});
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

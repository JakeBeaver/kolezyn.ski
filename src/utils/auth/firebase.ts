import { derived, writable } from 'svelte/store';
import { signInWithPopup, GoogleAuthProvider, signOut } from '@firebase/auth';
import { LS } from '../localStorage/LS';
import { auth, provider } from './firebaseConfig';

interface User {
	isLoggedIn: boolean;
	name: string;
	email: string;
	photoURL: string;
}
const LSKey = 'google_auth';
class CredentialData {
	static store = writable(CredentialData.fromStorage());
	static readonly initUserState: User = {
		isLoggedIn: false,
		name: '',
		email: '',
		photoURL: ''
	};
	static empty(): CredentialData {
		return new CredentialData(null, null);
	}
	static fromStorage(): CredentialData {
		const stored = LS.get<any>(LSKey);
		if (!stored) return CredentialData.empty();
		const { result, credential } = stored;
		return new CredentialData(result, credential);
	}
	public constructor(private readonly result, private readonly credential) {}

	public save() {
		const { result, credential } = { ...this };
		if (!!result) {
			LS.set(LSKey, { result, credential });
		} else {
			LS.drop(LSKey);
		}
		CredentialData.store.set(this);
	}

	public getUser(): User {
		return !this.result
			? CredentialData.initUserState
			: {
					isLoggedIn: true,
					name: this.result.user.displayName,
					email: this.result.user.email,
					photoURL: this.result.user.photoURL
			  };
	}
}

export const user = derived(CredentialData.store, (x) => x.getUser());
export const logOut = () => signOut(auth).then(() => CredentialData.empty().save());
export const logIn = () =>
	signInWithPopup(auth, provider)
		.then((result) => {
			
			// This gives you a Google Access Token. You can use it to access the Google API.
			const googleCredential = GoogleAuthProvider.credentialFromResult(result);
			new CredentialData(result, googleCredential).save();
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

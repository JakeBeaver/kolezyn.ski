import { initializeApp } from '@firebase/app';
import { getAuth, GoogleAuthProvider } from '@firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBDEc9908mKjEQiDaHHEq_57xBAa2ipt44',
	authDomain: 'kolezyn.ski',
	databaseURL: 'https://landing-18c1e-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'landing-18c1e',
	storageBucket: 'landing-18c1e.appspot.com',
	messagingSenderId: '75991988600',
	appId: '1:75991988600:web:fc1b16dc183969d797308d',
	measurementId: 'G-H2CGN2RXN1'
};
export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
auth.languageCode = 'it';

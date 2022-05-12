import { auth } from '../auth/firebaseConfig';
import { getDatabase, ref, push, onValue, get } from '@firebase/database';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const dbref = () => ref(getDatabase(), 'landing_messages/' + auth.currentUser.uid);
const dbrefAll = () => ref(getDatabase(), 'landing_messages/');

export async function publishMessage(message: string) {
	const user = auth.currentUser;
	const msg = {
		message,
		timestamp: new Date().toString(),
		name: user.displayName,
		email: user.email,
		pic: user.photoURL
	};
	var output = await push(dbref(), msg);
	return output;
}

interface Message {
	timestamp: Date;
	email: string;
	message: string;
	name: string;
	pic: string;
}

export function getMyMessagesStore() : Writable<Message[]> {
	const snapshot = writable<Message[]>();
	onValue(dbref(), (x) => {
		const val = x.val();
		
		const parsed = Object.values(val) as Message[];
		for (let item of parsed){
			item.timestamp = new Date(item.timestamp);
		}
		const ordered = parsed.sort((a,b)=>a.timestamp.getDate() - b.timestamp.getDate())
		snapshot.set(ordered);
	});
	return snapshot;
}

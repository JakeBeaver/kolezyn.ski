import { auth } from '../auth/firebaseConfig';
import { getDatabase, ref, push, onValue, get, off } from '@firebase/database';
import { derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { onAuthStateChanged } from '@firebase/auth';

export const slots = writable<MessageSlot[]>([]);
export const selectedUid = writable<string>();
export const messages = derived(
	[slots, selectedUid],
	([s, uid]) => s.find((x) => x.uid === uid)?.messages || []
);

slots.subscribe((slots) => {
	if (slots.length === 1) {
		selectedUid.set(slots[0].uid);
	}
	console.log(slots);
});

onAuthStateChanged(auth, (u) => {
	if (u) {
		attachStore(slots);
	} else {
		unsub();
		slots.set([]);
		selectedUid.set(undefined);
	}
});

let usedUids = [];
function unsub() {
	off(dbrefAll());
	for (const uid of usedUids) {
		off(dbref(uid));
	}
	usedUids = [];
}

function dbref(uid: string) {
	usedUids.push(uid);
	return ref(getDatabase(), 'landing_messages/' + uid);
}
const dbrefAll = () => ref(getDatabase(), 'landing_messages/');
const dbrefAdmin = () => ref(getDatabase(), 'admins/' + auth.currentUser.uid);

export async function publishMessage(message: string, uid: string) {
	if (!uid) throw 'cannot publish message without uid';
	const user = auth.currentUser;
	if (!user) throw 'cannot publishh message without authentication';
	const msg = {
		message,
		timestamp: new Date().toString(),
		name: user.displayName,
		email: user.email,
		pic: user.photoURL
	};
	var output = await push(dbref(uid), msg);
	return output;
}

interface MessageSlot {
	uid: string;
	email: string;
	name: string;
	pic: string;
	messages: Message[];
}

interface Message {
	timestamp: Date;
	message: string;
	email: string;
	name: string;
	pic: string;
}

function parse(x, uid: string): MessageSlot {
	const parsed = Object.values(x ?? []) as Message[];
	for (let item of parsed) {
		item.timestamp = new Date(item.timestamp);
	}
	const first = parsed[0];
	return {
		messages: parsed,
		uid: uid,
		email: first?.email,
		name: first?.name,
		pic: first?.pic
	};
}

async function checkIsAdmin() {
	try {
		await get(dbrefAdmin());
		return true;
	} catch {
		return false;
	}
}

function attachStore(snapshot: Writable<MessageSlot[]>): Writable<MessageSlot[]> {
	checkIsAdmin().then((isAdmin) => {
		return isAdmin ? attachAsAdmin(snapshot) : attachAsUser(snapshot, auth.currentUser.uid);
	});
	return snapshot;
}

function attachAsAdmin(snapshot: Writable<MessageSlot[]>) {
	onValue(dbrefAll(), (x) => {
		const val = x.val();
		const uids = Object.keys(val);
		for (const uid of uids) {
			val[uid] = parse(val[uid], uid);
		}
		snapshot.set(Object.values(val as MessageSlot));
	});
}

function attachAsUser(snapshot: Writable<MessageSlot[]>, uid: string) {
	return onValue(dbref(uid), (x) => {
		const parsed = parse(x.val(), uid);
		snapshot.set([parsed]);
	});
}

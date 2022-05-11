import { auth } from '../auth/firebaseConfig';
import { getDatabase, ref, push, onValue } from '@firebase/database';

const dbref = () => ref(getDatabase(), 'landing_messages/' + auth.currentUser.uid);

export async function publishMessage(message: string) {
	const msg = { message, timestamp: new Date().toString() };
	var output = await push(dbref(), msg);
	return output;
}

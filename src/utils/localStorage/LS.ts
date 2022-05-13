import { browser } from '$app/env';

class LS {
	static get<T>(key: string) {
		if (!browser)
			return null;
		return JSON.parse(localStorage.getItem(key)) as T;
	}
	static set(key: string, value: any) {
		if (browser)
			localStorage.setItem(key, JSON.stringify(value));
	}
	static drop(key: string) {
		if (browser)
			localStorage.removeItem(key);
	}
}

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY.trim(),
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const getAuthInstance = async () => {
	if (import.meta.env.VITE_AUTH === "local") return null;

	const { initializeApp } = await import("firebase/app");
	const { getAuth } = await import("firebase/auth");

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	return auth;
};

export const getFirestore = async () => {
	if (import.meta.env.VITE_SOURCE === "local") return null;
	const { initializeApp } = await import("firebase/app");

	const app = initializeApp(firebaseConfig);

	// init services - firestore
	db = import("firebase/firestore").getFirestore(app);
	return db;
};

export const getStorage = async () => {
	if (import.meta.env.VITE_SOURCE === "local") return null;
	const { initializeApp } = await import("firebase/app");

	const app = initializeApp(firebaseConfig);

	// init firebase storage
	storage = import("firebase/storage").getStorage(app);
	return storage;
};

let auth = null;
let db = null;
let storage = null;

export async function initFirebase() {
	if (import.meta.env.VITE_SOURCE !== "local") {
		const { initializeApp } = await import("firebase/app");
		const app = initializeApp(firebaseConfig);

		if (!db) {
			const { getFirestore } = await import("firebase/firestore");
			db = getFirestore(app);
		}

		if (!storage) {
			const { getStorage } = await import("firebase/storage");
			storage = getStorage(app);
		}
	}

	if (import.meta.env.VITE_AUTH !== "local") {
		const { initializeApp } = await import("firebase/app");
		const { getAuth } = await import("firebase/auth");
		const app = initializeApp(firebaseConfig);

		auth = getAuth(app);
	}

	// Throw error if any are still missing
	if (import.meta.env.VITE_SOURCE !== "local" && (!db || !storage)) {
		throw new Error("DB or Storage not available");
	}
	if (import.meta.env.VITE_AUTH !== "local" && !auth) {
		throw new Error("Auth not available");
	}
}

export { db, auth, storage };

import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { addDoc, doc, DocumentData, getDoc, collection, setDoc, updateDoc, query, getDocs } from 'firebase/firestore';
import { auth, db } from 'src/app/app.module';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	provider = new GoogleAuthProvider();
	constructor() {}

	user = {
		get: (uid: string) => this.getDoc(uid, 'users'),
		list: () => this.listDocs('users'),
		set: (uid: string, key: string, value: any) => this.setDoc('users', uid, key, value),
		add: (data: any) => this.createUser(data),
	};

	auth = {
		logout: () => signOut(auth),
		login: () => this.userLogin(),
		current: () => this.getCurrentUser(),
	};

	mentor = {
		list: () => this.listDocs('mentors'),
		get: (uid: string) => this.getDoc(uid, 'mentors'),
	};

	event = {
		get: (uid: string) => console.log('event.get called.'), //TODO
		list: () => console.log('event.list called.'), //TODO
		signin: (userUid: string) => console.log('User was signed in.'), //TODO
	};

	company = {
		register: () => console.log('Company was registered.'), //TODO
	};

	async userLogin(): Promise<any> {
		await signInWithPopup(auth, this.provider)
			.then(async (result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;

				// The signed-in user info.
				const user = result.user;
				console.log('😊 logged in.');

				// Add user to DB if not existing
				const userShort = { name: user.displayName, uid: user.uid, email: user.email, avatar: user.photoURL };
				try {
					await this.user.get(user.uid);
				} catch (error) {
					this.user.add(userShort);
				}
				return userShort;
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				return 'Error logging in: ' + error;
			});
	}

	async getCurrentUser(): Promise<any> {
		const user: any = auth.currentUser;
		if (user)
			try {
				console.log('Before getUser');
				let userDB = await this.user.get(user.uid);
				console.log('After getUser');
				return userDB;
			} catch {
				return { name: user.displayName, avatar: user.avatar, email: user.email, uid: user.uid };
			}
	}

	async getDoc(uid: string, collection: string): Promise<DocumentData> {
		console.log(`Searching user ${uid}...`);
		const docRef = doc(db, collection, uid);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw `User ${uid} not found.`;
		}
		return docSnap.data();
	}

	async createUser(user: any) {
		return await setDoc(doc(db, 'users', user.uid), user);
	}

    write(inputCollection: string, data: any) {
		switch (typeof data) {
			case 'object':
				addDoc(collection(db, inputCollection), data);
				break;

			case 'string':
				try {
					const importArray: object[] = JSON.parse(data);
					importArray.forEach((obj) => {
						addDoc(collection(db, inputCollection), obj);
					});
				} catch {
					const importObject = JSON.parse(data);
					addDoc(collection(db, inputCollection), importObject);
				}
		}
	}

	async setDoc(type: string, uid: string, key: string, value: any): Promise<any> {
		const docRef = doc(db, type, uid);
		return await updateDoc(docRef, { [key]: value });
	}

	async listDocs(type: string): Promise<any[]> {
		const q = query(collection(db, type));
		const querySnapshot = await getDocs(q);
		return new Promise((resolve, reject) => {
			const foundDocs: any[] = [];
			querySnapshot.forEach((doc) => foundDocs.push({ id: doc.id, ...doc.data() }));
			if (foundDocs == []) {
				reject('No Documents found.');
			}
			resolve(foundDocs);
		});
	}
}

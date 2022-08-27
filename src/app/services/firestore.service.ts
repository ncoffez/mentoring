import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { addDoc, doc, DocumentData, getDoc, collection } from 'firebase/firestore';
import { auth, db } from 'src/app/app.module';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	provider = new GoogleAuthProvider();
	constructor() {}

	user = {
		get: (uid: string) => this.getDoc(uid, 'users'),
		list: () => console.log('user.list called.'), //TODO
		set: (uid: string, attribute: string, data: any[]) => console.log('Adding data to user.'), //TODO
		add: (data: any) => this.write('users', data),
	};

	auth = {
		logout: () => signOut(auth),
		login: () => this.userLogin(),
		current: () => this.getCurrentUser(),
	};

	mentor = {
		list: () => console.log('Lists all mentors.'), //TODO
	};

	event = {
		get: (uid: string) => console.log('event.get called.'), //TODO
		list: () => console.log('event.list called.'), //TODO
		signin: (userUid: string) => console.log('User was signed in.'), //TODO
	};

	company = {
		register: () => console.log('Company was registered.'), //TODO
	};

	mock = {
		event: {
			add: () => console.log('Adding new mock event.'), //TODO
			get: () => console.log('Get list of select mock events'), //TODO
			remove: () => console.log('Removing mock event'), //TODO
		},
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
				if(!this.user.get(user.uid)) this.user.add(userShort);
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
		if (user) try{
            console.log('Before getUser');
            let userDB = await this.user.get(user.uid);
            console.log('After getUser');
            return userDB;
		}
        catch {
            return {'name': user.displayName, 'avatar': user.avatar, 'email': user.email, 'uid': user.uid}
        }
	}

	async getDoc(uid: string, collection: string): Promise<DocumentData> {
        console.log(`Searching user ${uid}...`)
		const docRef = doc(db, collection, uid);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			throw `User ${uid} not found.`;
		}
		return docSnap.data();
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
}

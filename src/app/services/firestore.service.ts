import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { auth } from 'src/app/app.module';

@Injectable({
	providedIn: 'root',
})
export class FirestoreService {
	provider = new GoogleAuthProvider();
	constructor() {}

	user = {
		get: (uid: string) => console.log('user.get called.'), //TODO
		list: () => console.log('user.list called.'), //TODO
		set: (uid: string, attribute: string, data: any[]) => console.log('Adding data to user.'), //TODO
		add: (data: any[]) => console.log('New user created.'), //TODO
	};

	auth = {
		logout: () => {
			signOut(auth);
			console.log('😊 logged out.');
		},
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
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;

				// The signed-in user info.
				const user = result.user;
				console.log('😊 logged in.');
				return user;
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

	getCurrentUser(): any {
		const user: any = auth.currentUser;
		if (user) {
			return {
				name: user.displayName,
				uid: user.uid,
				email: user.email,
				avatar: user.photoURL,
			};
		}
	}
}

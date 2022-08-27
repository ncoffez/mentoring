import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
	user: any;

	pages = [
		{ name: 'Home', link: '/' },
		{ name: 'Events', link: '/Events' },
		{ name: 'Role Models', link: '/RoleModels' },
		{ name: 'Sponsoring', link: '/Sponsoring' },
		{ name: 'Über uns', link: '/About' },
	];

	constructor(private fs: FirestoreService) {}

	async ngOnInit() {
		this.user = await this.fs.auth.current();
	}

	async login() {
        await this.fs.auth.login();
        this.user = this.fs.auth.current();
	}

    logout(): any {
        this.fs.auth.logout();
        this.user = null;
    }
}

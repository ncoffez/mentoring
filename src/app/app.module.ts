import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { UsercardComponent } from './components/usercard/usercard.component';
import { EventBannerComponent } from './components/event-banner/event-banner.component';
import { RoleModelsComponent } from './role-models/role-models.component';
import { AboutComponent } from './about/about.component';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Import the angular Material commands
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		EventsComponent,
		UsercardComponent,
		EventBannerComponent,
		RoleModelsComponent,
		AboutComponent,
	],

	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSnackBarModule, MatButtonModule, MatInputModule, MatMenuModule, MatIconModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

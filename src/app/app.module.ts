import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig} from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { UserComponent } from './user/user.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { UsercardComponent } from './components/usercard/usercard.component';
import { EventBannerComponent } from './components/event-banner/event-banner.component';
import { HowToComponent } from './how-to/how-to.component';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventsComponent,
    UserComponent,
    EventDetailComponent,
    UsercardComponent,
    EventBannerComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

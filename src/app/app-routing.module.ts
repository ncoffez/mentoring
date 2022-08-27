import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { EventsComponent } from './events/events.component';
import { RoleModelsComponent } from './role-models/role-models.component';
import { SponsoringComponent } from './sponsoring/sponsoring.component';

const routerOptions: ExtraOptions = {
	relativeLinkResolution: 'corrected',
	scrollPositionRestoration: 'enabled',
	initialNavigation: 'enabledBlocking',
};

const routes: Routes = [
	{
		path: '',
        component: EventsComponent,
	},
	{
		path: 'RoleModels',
        component: RoleModelsComponent,
	},
	{
		path: 'Events',
        component: EventsComponent
	},
	{
		path: 'Sponsoring',
        component: SponsoringComponent
	},
	{
		path: 'About',
        component: AboutComponent
	},
	{
		path: 'Events/:id',
        component: EventDetailsComponent
	},
	{
	 	path: 'User/:id',
		component: MentorDetailsComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

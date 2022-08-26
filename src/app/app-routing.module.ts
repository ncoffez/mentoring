import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

// const routerOptions: ExtraOptions = {
// 	relativeLinkResolution: 'corrected',
// 	scrollPositionRestoration: 'enabled',
// 	initialNavigation: 'enabledBlocking',
// };

const routes: Routes = [
	{
		path: '',
		redirectTo: 'Events',
		pathMatch: 'full',
	},
	{
		path: 'Howto',
		loadChildren: () => import('./how-to/how-to.component').then((m) => m.HowToComponent),
	},
	{
		path: 'Events',
		loadChildren: () => import('./events/events.component').then((m) => m.EventsComponent),
	},
	// {
	// 	path: 'Events/:id',
	// 	loadChildren: () => import('./event-detail/event-detail.component').then((m) => m.EventDetailComponent),
	// },
	// {
	// 	path: 'User/:id',
	// 	loadChildren: () => import('./user/user.component').then((m) => m.UserComponent),
	// },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

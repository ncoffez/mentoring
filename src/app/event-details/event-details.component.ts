import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import events from 'src/mock/event.json';
import { FirestoreService } from '../services/firestore.service';

@Component({
	selector: 'app-event-details',
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
	event: any;
	title: any;
    mentors: any;
	constructor(private activatedRoute: ActivatedRoute, private fs: FirestoreService) {}

	async ngOnInit() {
		const routeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
		this.event = events.events[routeId];

		this.title = {
			banner: 'Events',
			subtitle: this.event.organizor,
		};
        this.mentors = await this.fs.mentor.list();
	}
}

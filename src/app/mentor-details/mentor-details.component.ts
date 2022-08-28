import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import events from 'src/mock/event.json';

@Component({
	selector: 'app-mentor-details',
	templateUrl: './mentor-details.component.html',
	styleUrls: ['./mentor-details.component.scss'],
})
export class MentorDetailsComponent implements OnInit {
	mentor: any;
	title: any;
	events: any;

	constructor(private activatedRoute: ActivatedRoute, private fs: FirestoreService) {}

	async ngOnInit() {
		this.title = {
			banner: 'Mentoring',
			subtitle: 'Mentorin',
		};
		const now = new Date();
		this.events = events.events.filter((event) => {
            const timeToEvent = Date.parse(event.start) > now.getUTCMilliseconds();
            console.log(timeToEvent);
		});
		const mentorId = this.activatedRoute.snapshot.paramMap.get('id')!;
		this.mentor = await this.fs.mentor.get(mentorId);
	}
}

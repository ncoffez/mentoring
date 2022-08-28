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
	user: any;
	constructor(private activatedRoute: ActivatedRoute, private fs: FirestoreService) {}

	async ngOnInit() {
		this.user = await this.fs.auth.current();
		const routeId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
		this.event = events.events[routeId];

		this.title = {
			banner: 'Events',
			subtitle: this.event.organizor,
		};
		console.log('🤩 User: ', this.user);
		this.mentors = await this.fs.mentor.list();
		if (this.user?.skills.length > 0) {
			this.mentors = this.mentors.map((mentor: any) => {
				mentor.matches = this.findMatches(mentor.skills, this.user.skills);
				console.log(mentor);
				return mentor;
			});
		}

		this.mentors.sort((acc: any, value: any) => value.matches - acc.matches);
	}

	findMatches(userSkills: string[], mentorSkills: string[]): number {
		let matches = 0;

		for (let mentorSkill of mentorSkills) {
			if (userSkills.includes(mentorSkill)) matches++;
		}

		return matches;
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { faker } from '@faker-js/faker';
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
	confirmations: any;
	allTestimonials: any = ['assets/BG-0.png', 'assets/BG-1.png', 'assets/BG-2.png', 'assets/BG-3.png', 'assets/BG-4.png'];

	testimonials: any;

	event_paths = ['assets/Frame 1.png',
	'assets/Frame 2.png',
	'assets/Frame 3.png'];

	constructor(private activatedRoute: ActivatedRoute, private fs: FirestoreService) {}

	async ngOnInit() {
		this.title = {
			banner: 'Mentoring',
			subtitle: 'Mentorin',
		};
		const now = new Date();
		this.events = faker.helpers.arrayElements(events.events, 3);
		const mentorId = this.activatedRoute.snapshot.paramMap.get('id')!;
		this.mentor = await this.fs.mentor.get(mentorId);

		this.testimonials = faker.helpers.arrayElements(this.allTestimonials, 2);
		this.confirmations = new Array(this.mentor.skills.length).fill('a').map((a) => this.getConfirmations());
	}

	getConfirmations(): any {
		// returns between 1-5 images in an array
		const amount = Math.floor(Math.random() * 4 + 1);
		const confirmations = faker.helpers.arrayElements(this.allTestimonials, amount);
		return confirmations;
	}
}

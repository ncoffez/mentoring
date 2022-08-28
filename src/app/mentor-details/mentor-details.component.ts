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
	testimonial_1:any;
	testimonial_2:any;
	
	constructor(private activatedRoute: ActivatedRoute, private fs: FirestoreService) { }

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

		/*this.confirmations = [{
			"skill": "bla",
			"persons": faker.helpers.arrayElements(["BG-1.png", "BG-2.png", "BG-3.png", "BG-4.png", "BG-2.png"])
		}];*/
		this.confirmations = faker.helpers.arrayElements(["BG-1.png", "BG-2.png", "BG-3.png", "BG-4.png", "BG-2.png"]);
		let testimonials = faker.helpers.arrayElements(["BG-1.png", "BG-2.png", "BG-3.png", "BG-4.png", "BG-2.png"], 2);
		this.testimonial_1 = testimonials[0];
		this.testimonial_2 = testimonials[1];
	}
}

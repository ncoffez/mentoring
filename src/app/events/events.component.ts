import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import events_mock from 'src/mock/event.json';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
	title = {
		banner: 'Events',
		subtitle: 'Nächstes Event',
	};

	events = Object.values(events_mock.events);
	constructor() {}

	ngOnInit(): void {
		/*
		var url = "https://www.eventbriteapi.com/v3/events/?event_ids=308606629737,324854607877,331078503717,261358098107";

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);

		xhr.setRequestHeader("Authorization", "Bearer VAPLIPCT5TK5HWK22ABA");
		let _this = this;
		xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log(xhr.status);
			let data = JSON.parse(xhr.responseText);
			_this.events = data.events;
			console.log(data.events[0].end);
			console.log(data.events);
		}};
		xhr.send();
		*/
	}

	calcDuration(startStr: string, endStr: string) {
		const startVal = Date.parse(startStr);
		const endVal = Date.parse(endStr);

		const duration = (endVal - startVal);
		return duration; //in milliseconds
	}
}

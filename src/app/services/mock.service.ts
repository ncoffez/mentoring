import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { faker } from '@faker-js/faker';

@Injectable({
	providedIn: 'root',
})
export class MockService {
	constructor(private fs: FirestoreService) {}

    skills = ["Icebreaker", "Java Master", "Datenbank", "Podcast", "Network or die", "Aareböötle", "Fullstack","Digital Nomad", "WomaninTech", "DB Hero"]

	mentor() {
        const firstName = faker.name.firstName("female");
        const lastName = faker.name.lastName("female");
        const data = {
            name: (firstName + " " + lastName) as string,
            email: `${firstName}.${lastName}@gmail.com`,
            avatar: faker.image.avatar(),
            pitch: `Hi, ich heisse ${firstName} und gehe seit Jahren gerne an Netzwerk Events. Mittlerweile kenne ich Frauen auf allen Karrierestufen und so öffnen sich immer wieder neue Türen. Gerne helfe ich bei den ersten Schritten im Netzwerklen. Unterhalten können wir uns auf deutsch, englisch oder französisch.`,
            skills: faker.helpers.arrayElements(this.skills, this.random())
        }
        this.fs.write('mentors', data)
    }

    random = () => Math.floor(Math.random()*3+2)



}

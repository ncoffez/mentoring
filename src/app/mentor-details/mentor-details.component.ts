import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.scss']
})
export class MentorDetailsComponent implements OnInit {
  mentor: any;
  title: any;

  constructor(private activatedRoute: ActivatedRoute, private fs: FirestoreService) {}

  async ngOnInit(){
    this.title = {
			banner: 'Mentoring',
			subtitle: 'Mentorin',
		};

    const mentorId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.mentor = await this.fs.mentor.get(mentorId);
  }
}

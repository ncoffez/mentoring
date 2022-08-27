import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { MockService } from '../services/mock.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private fs: FirestoreService, private mock: MockService) { }

  ngOnInit(): void {
  }

  mockMentor() {
    this.mock.mentor();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    pages = [
        {name: "Home", link: "/"},
        {name: "Events", link: "/Events"},
        {name: "Role Models", link: "/RoleModels"},
        {name: "Sponsoring", link: "/Sponsoring"},
        {name: "Über uns", link: "/About"},
    ]

  constructor() { }

  ngOnInit(): void {
  }

}

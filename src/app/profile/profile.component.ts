import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userToken: any;
  userRole: any;

  constructor(private token: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userToken = this.token.getToken();
    this.userRole = this.token.getUserRole();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './../../shared/services/auth.service';

import { User } from './../../shared/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userState: User;
  userStateSubscription$: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userStateSubscription$ = this.auth.authState.subscribe((data: User) => {
      this.userState = data;
    });
  }

  ngOnDestroy(): void {
    this.userStateSubscription$.unsubscribe();
  }

  logout() {
    
    this.auth.logout();
  }

}

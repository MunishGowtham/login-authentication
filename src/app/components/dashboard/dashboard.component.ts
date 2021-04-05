import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  userDetails!: Client;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = this.authService.getUserDetails();
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

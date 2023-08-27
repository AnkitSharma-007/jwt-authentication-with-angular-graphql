import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserRole } from '../models/userRoles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  readonly userData$ = this.authenticationService.userData$;
  readonly UserRole = UserRole;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  logout() {
    this.router.navigate(['/']);
    this.authenticationService.logout();
  }
}

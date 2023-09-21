import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  readonly admin$ = this.adminService
    .watch()
    .valueChanges.pipe(map((result) => result?.data));

  adminError$ = this.admin$.pipe(catchError((error) => of(error)));

  constructor(private readonly adminService: AdminService) {}
}

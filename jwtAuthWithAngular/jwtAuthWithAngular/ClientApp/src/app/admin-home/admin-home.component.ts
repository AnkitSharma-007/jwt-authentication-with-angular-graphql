import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  readonly admin$ = this.adminService
    .watch()
    .valueChanges.pipe(map((result) => result?.data));

  constructor(private readonly adminService: AdminService) {}
}

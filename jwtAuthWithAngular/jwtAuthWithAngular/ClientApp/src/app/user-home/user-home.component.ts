import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  readonly user$ = this.userService
    .watch()
    .valueChanges.pipe(map((result) => result?.data));

  userError$ = this.user$.pipe(catchError((error) => of(error)));

  constructor(private readonly userService: UserService) {}
}

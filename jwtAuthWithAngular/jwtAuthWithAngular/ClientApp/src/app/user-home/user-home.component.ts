import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  readonly user$ = this.userService
    .watch()
    .valueChanges.pipe(map((result) => result?.data));

  constructor(private readonly userService: UserService) {}
}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LoginService } from './login.service';
import { UserLogin } from '../models/userLogin';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData$ = new BehaviorSubject<User>(new User());

  constructor(
    private readonly apollo: Apollo,
    private readonly loginService: LoginService
  ) {}

  login(userLoginData: UserLogin) {
    return this.loginService.mutate({ loginData: userLoginData }).pipe(
      map((response) => {
        if (response.data) {
          const authToken = response.data.userLogin.token;
          localStorage.setItem('authToken', authToken);
          this.setUserDetails(authToken);
        }
        return response;
      })
    );
  }

  setUserDetails(authToken: string) {
    if (authToken != null) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(
        window.atob(authToken.split('.')[1])
      );

      userDetails.userName = decodeUserDetails.name;
      userDetails.firstName = decodeUserDetails.firstName;
      userDetails.userTypeName = decodeUserDetails.sub;
      userDetails.isLoggedIn = true;
      this.userData$.next(userDetails);
    }
  }

  logout() {
    localStorage.clear();
    this.userData$.next(new User());
    this.apollo.client.resetStore();
  }
}

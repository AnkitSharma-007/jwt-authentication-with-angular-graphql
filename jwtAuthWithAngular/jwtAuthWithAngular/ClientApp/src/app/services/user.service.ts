import { Injectable } from '@angular/core';
import { GET_USER_DATA } from '../GraphQL/query';
import { Query } from 'apollo-angular';
import { UserType } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService extends Query<UserType> {
  document = GET_USER_DATA;
}

import { Injectable } from '@angular/core';
import { GET_Admin_DATA } from '../GraphQL/query';
import { Query } from 'apollo-angular';
import { AdminType } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends Query<AdminType> {
  document = GET_Admin_DATA;
}

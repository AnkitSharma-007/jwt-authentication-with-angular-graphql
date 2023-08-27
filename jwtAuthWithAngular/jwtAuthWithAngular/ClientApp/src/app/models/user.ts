export class User {
  userName: string;
  firstName: string;
  userTypeName: string;
  isLoggedIn: boolean;

  constructor() {
    this.userName = '';
    this.firstName = '';
    this.userTypeName = '';
    this.isLoggedIn = false;
  }
}

export type UserType = {
  userData: string;
};

export type AdminType = {
  adminData: string;
};

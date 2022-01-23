export interface RegisterDataInterface {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  country: string;
  email: string;
  password: string;
  telephone: number;
}

export interface GoogleLoginDataInterface {
  idToken: string;
}

export interface FacebookLoginDataInterface {
  userID: string;
  accessToken: string;
}

export interface SimpleLoginDataInterface {
  email: string;
  password: string;
}

export interface ChangePasswordInterface {
  password: string;
  newPassword: string;
}

export interface UpdateProfileInterface {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  country: string;
  email: string;
}

export interface confirmPhoneNumberInterface {
  phone: string
}



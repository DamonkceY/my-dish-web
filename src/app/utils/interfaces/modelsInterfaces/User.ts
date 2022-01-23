
export default interface UserModelInterface {
  _id: string;
  firstName: string;
  lastName: string;
  address?: string;
  postalCode?: string;
  country?: string;
  email: string;
  telephone: number;
  favoriteRestaurants: any[];
  favoritePlats: any[];
  userRatings: any[];
  isConfirmed: boolean;
  otpTries: number;
  status: boolean;
  creditCardInfos: any[];
  customerIdInnvoice: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userModelKeys = [
  '_id',
  'firstName',
  'lastName',
  'address',
  'postalCode',
  'country',
  'email',
  'telephone',
  'favoriteRestaurants',
  'favoritePlats',
  'userRatings',
  'isConfirmed',
  'otpTries',
  'status',
  'creditCardInfos',
  'customerIdInnvoice',
  'createdAt',
  'updatedAt',
]

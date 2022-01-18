
export const baseUrl = 'https://my-dish-app.herokuapp.com'

export const authEndpoints = {
  login: '/auth/login',
  loginWithFacebook: '/auth/loginWithFacebook',
  loginWithGoogle: '/auth/loginWithGoogle',
  register: '/user/register',
  getMyProfile: '/user/profile',
  changePassword: '/user/changePassword',
  updateProfile: '/user/updateInfo',
  confirmPhoneNumber: '/user/confirmSms'
}

export const commonEndpoints = {
  myReservations: '/Order/getReservationList'
}

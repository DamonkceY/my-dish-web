
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
  myReservations: '/Order/getReservationList',
  myPromoCodes: '/PromoCode/getMyPromoCodes',
  myRates: '/user/getMyRates'
}


export const announcesEndpoints = {
  addRating: '/Rating/add',
  updateRating: (id: string) => `/Rating/update/${id}`,
  search: '/Restaurant/searchRestaurant',
  mainHome: '/Restaurant/restaurantInHomePage',
  newRestaurants: '/Restaurant/getRestaurantList',
  restaurantsSpecialities: '/Restaurant/restaurantSpecialities',
  nearbyRestaurants: '/user/getNearByRestaurants',
  getRestaurantById: (id: string) => `/Restaurant/restaurantDetails/${id}`,
  setFavoriteRestaurant: (id: string, favorite: boolean) => `/user/${!favorite ? 'bookmarkRestaurant' : 'unbookmarkRestaurant'}/${id}`
}

export const cartEndpoints = {
  addToCart: '/ShoppingCart/addToCart',
  removeFromCart: '/ShoppingCart/removeFromCart',
  getCart: '/ShoppingCart/getProductInCart',
  passOrder: '/Order/passOrder',
  decrement: `/ShoppingCart/decrementProductInCart`,
  increment: `/ShoppingCart/incrementProductInCart`,
  checkIfIntentPayed: (key: string) => `/Order/checkIfOrderPayed/${key}`,
  clearCart: '/ShoppingCart/clearMyCart'
}

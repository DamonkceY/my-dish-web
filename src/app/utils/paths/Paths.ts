

export const Paths = {
  home: '/home',
  restaurantHome: '/restaurantHome',
  auth: {
    index: '/auth',
    register: 'createAccount',
    passwordForgotten: 'forgotPassword'
  },
  market: {
    index: '/market/:name',
  },
  searchResult: '/searchResult',
  restaurant: '/restaurant/:id',
  shop: '/shop',
  cart: '/cart',
  profile: {
    index: '/profile',
    security: 'security',
    myReservations: 'myReservations',
    fidelity: 'loyaltySpace',
    rates: 'rates',
    favorites: 'favorites',
  },
  redirect: '*'
}

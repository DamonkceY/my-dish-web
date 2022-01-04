import React, { useEffect } from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Authentication from './features/authentication/authentication'
import { Paths } from './app/utils/paths/Paths'
import Login from './features/authentication/components/login/login'
import Register from './features/authentication/components/register/register'
import PasswordForgotten from './features/authentication/components/passwordForgotten/passwordForgotten'
import MainHome from './features/mainHome/mainHome'
import RestaurantLandingPage from './features/restauLandingPage/restaurantLandingPage'
import Market from './features/market/market'
import Restaurant from './features/restaurant/restaurant'
import Shop from './features/shop/shop'
import ShoppingCart from './features/shoppingCart/shoppingCart'
import Profile, { LeftSide } from './features/profile/profile'
import MyProfile from './features/profile/components/myProfile/myProfile'
import MyReservations from './features/profile/components/myReservations/myReservations'
import LoyaltySpace from './features/profile/components/loyaltySpace/loyaltySpace'
import MyRates from './features/profile/components/myRates/myRates'
import MyFavorite from './features/profile/components/myFavorites/myFavorite'
import SearchResult from './features/searchResult/searchResult'
import Security from './features/profile/components/security/security'
import Test from './test'
import spinner from './assets/spinner.svg'
import { useAppSelector } from './app/store/hooks'
import { selectDeviceWidth, selectRootLoading, setDeviceWidth } from './app/store/storeModules/root/root'
import { useDispatch } from 'react-redux'
import Footer from './sharedComponents/footer/footer'
import MobileNavigation from './sharedComponents/mobileNavigation/mobileNavigation'

const App = () => {
  const isRootLoading = useAppSelector(selectRootLoading)
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const dispatch = useDispatch()
  useEffect(() => {
    window.addEventListener('resize', () => {
      dispatch(setDeviceWidth(document.body.clientWidth))
    })
  }, [])
  return (
    <div style={{position: 'relative'}}>
      {
        isRootLoading && (
          <div className='loaderContainer'>
            <img draggable={false} className='spinnerIcon' src={spinner} alt='' />
          </div>
        )
      }
      <BrowserRouter>
        <Routes>
          <Route path={Paths.home} element={<MainHome />} />
          <Route path={Paths.restaurantHome} element={<RestaurantLandingPage />} />
          <Route path={Paths.market.index} element={<Market />} />
          <Route path={Paths.restaurant} element={<Restaurant />} />
          <Route path={Paths.shop} element={<Shop />} />
          <Route path={Paths.cart} element={<ShoppingCart />} />
          <Route path={Paths.searchResult} element={<SearchResult />} />
          <Route path={Paths.mobileProfile} element={<Profile/>}/>
          <Route path={Paths.profile.index} element={<Profile />}>
            <Route index element={<MyProfile />} />
            <Route path={Paths.profile.security} element={<Security />} />
            <Route path={Paths.profile.myReservations} element={<MyReservations />} />
            <Route path={Paths.profile.fidelity} element={<LoyaltySpace />} />
            <Route path={Paths.profile.rates} element={<MyRates />} />
            <Route path={Paths.profile.favorites} element={<MyFavorite />} />
          </Route>
          <Route path={Paths.auth.index} element={<Authentication />}>
            <Route index element={<Login />} />
            <Route path={Paths.auth.register} element={<Register />} />
            <Route path={Paths.auth.passwordForgotten} element={<PasswordForgotten />} />
          </Route>
          <Route path={Paths.redirect} element={<Navigate to={Paths.home} />} />
          {/*<Route path={'/test'} element={<Test />} />*/}
        </Routes>
        {deviceWidth > 768 ? <Footer /> : (
          <div>
            <MobileNavigation />
          </div>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App

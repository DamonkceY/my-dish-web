import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Authentication from './features/authentication/authentication';
import { Paths } from './app/utils/paths/Paths'
import Login from './features/authentication/components/login/login'
import Register from './features/authentication/components/register/register'
import PasswordForgotten from './features/authentication/components/passwordForgotten/passwordForgotten'
import MainHome from './features/mainHome/mainHome'
import RestaurantLandingPage from './features/restauLandingPage/restaurantLandingPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={Paths.home} element={<MainHome/>}/>
          <Route path={Paths.restaurantHome} element={<RestaurantLandingPage/>}/>
          <Route path={Paths.auth.index} element={<Authentication/>}>
            <Route index element={<Login/>}/>
            <Route path={Paths.auth.register} element={<Register/>}/>
            <Route path={Paths.auth.passwordForgotten} element={<PasswordForgotten/>}/>
          </Route>
          <Route path={Paths.redirect} element={<Navigate to={Paths.home}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

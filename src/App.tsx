import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from './features/authentication/authentication';
import { Paths } from './app/utils/paths/Paths'
import FirstStepLogin from './features/authentication/components/login/firstStepLogin'
import FirstStepRegister from './features/authentication/components/register/firstStepRegister'
import PasswordForgotten from './features/authentication/components/passwordForgotten/passwordForgotten'
import MainHome from './features/mainHome/mainHome'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={Paths.home} element={<MainHome/>}/>
          <Route path={Paths.auth.index} element={<Authentication/>}>
            <Route index element={<FirstStepLogin/>}/>
            <Route path={Paths.auth.register} element={<FirstStepRegister/>}/>
            <Route path={Paths.auth.passwordForgotten} element={<PasswordForgotten/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

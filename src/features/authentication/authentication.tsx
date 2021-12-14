import React from 'react'
import { Outlet } from 'react-router-dom'
import './authentication.scss'
import myDishLogo from '../../assets/myDishLogo.svg'

const Authentication = () => {
  return (
    <div className='authContainer'>
      <img
        draggable={false}
        className='logo'
        src={myDishLogo}
        alt=''
      />
      <div className='steppersContainer'>
        <Outlet />
      </div>
    </div>
  )
}

export default Authentication

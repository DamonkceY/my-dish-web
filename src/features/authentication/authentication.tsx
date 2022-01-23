import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import './authentication.scss'
import myDishLogo from '../../assets/myDishLogo.svg'
import { Paths } from '../../app/utils/paths'

const Authentication = () => {
  const navigate = useNavigate()
  return (
    <div className='authContainer'>
      <img
        onClick={() => navigate(Paths.home)}
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

import './security.scss'
import { Paths } from '../../../../app/utils/paths'
import myDishLogo from '../../../../assets/myDishLogo.svg'
import { Outlet, useNavigate } from 'react-router-dom'
import React from 'react'

const SecurityPagesContainer = () => {

  const navigate = useNavigate()

  return (
    <div className='securityPageContainer'>
      <div className='authContainer noBackground'>
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
    </div>
  )
}

export default SecurityPagesContainer

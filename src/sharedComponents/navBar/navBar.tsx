import React from 'react'
import LOGO from '../../assets/myDishLogo.svg'
import './navBar.scss'

export interface NavbarConfigInterface {
  middleComponent?: JSX.Element,
  rightComponent?: JSX.Element,
}

const NavBar: React.FC<{config?: NavbarConfigInterface}> = ({ config }) => {
  return (
    <div className='navBarContainer'>
        <img src={LOGO} alt='' />
        {
          config?.middleComponent && config.middleComponent
        }
        {
          config?.rightComponent && config.rightComponent
        }
    </div>
  )
}

export default NavBar

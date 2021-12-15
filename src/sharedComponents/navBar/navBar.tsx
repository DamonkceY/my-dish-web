import React, { useEffect, useState } from 'react'
import LOGO from '../../assets/myDishLogo.svg'
import './navBar.scss'

export interface NavbarConfigInterface {
  middleComponent?: JSX.Element,
  rightComponent?: JSX.Element,
}

const NavBar: React.FC<{config?: NavbarConfigInterface}> = ({ config }) => {
  const [isShadow, setShadow] = useState(false);
  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      setShadow(window.scrollY !== 0)
    })
  }, [])
  return (
    <div style={isShadow ? {} : {boxShadow: 'unset'}} className='navBarContainer'>
        <img height='50px' draggable={false} src={LOGO} alt='' />
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

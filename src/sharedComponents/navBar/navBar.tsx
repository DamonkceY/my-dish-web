import React, { useEffect, useState } from 'react'
import LOGO from '../../assets/myDishLogo.svg'
import './navBar.scss'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'

export interface NavbarConfigInterface {
  middleComponent?: JSX.Element,
  rightComponent?: JSX.Element,
  isStatic?: boolean,
}

const NavBar: React.FC<{config?: NavbarConfigInterface}> = ({ config }) => {
  const [isShadow, setShadow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!config?.isStatic) {
      document.addEventListener('scroll', () => {
        setShadow(window.scrollY !== 0)
      })
      return () => {
        document.removeEventListener('scroll',() => null)
      }
    }
  }, [])
  return (
    <div style={{boxShadow: isShadow ? '' : 'unset', position: config?.isStatic ? 'unset' : 'fixed'}} className='navBarContainer'>
        <img onClick={() => navigate(Paths.home)} className='clickable' height='50px' draggable={false} src={LOGO} alt='' />
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

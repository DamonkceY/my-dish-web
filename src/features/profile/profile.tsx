import './profile.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useEffect, useState } from 'react'
import { searchBar } from '../market/market'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import profileSVG from '../../assets/seConnecterNoire.svg'
import ticket from '../../assets/blackTicket.svg'
import sale from '../../assets/sale.svg'
import chat from '../../assets/mesAvisBlack.svg'
import heart from '../../assets/blackHeart.svg'
import shield from '../../assets/shield.svg'
import { Paths } from '../../app/utils/paths'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth } from '../../app/store/storeModules/root/root'
import { logout, selectConnectedUser } from '../../app/store/storeModules/authentication/authenticationSlice'
import { useDispatch } from 'react-redux'
import { capitalizeFirstLetter } from '../../app/utils/func/commonFuncs'

const Profile = () => {
  const location = useLocation()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const [isMenuOnly, setIsMenuOnly] = useState(location.pathname === '/monProfile' && deviceWidth <= 768)
  const [isItemsOnly, setIsItemsOnly] = useState(location.pathname.includes('/profile') && deviceWidth <= 768)
  const [selectedTab, setSelectedTab] = useState(isMenuOnly ? undefined : 1)
  const navigate = useNavigate()
  const connectedUser = useAppSelector(selectConnectedUser)

  useEffect(() => {
    setIsMenuOnly(location.pathname === '/monProfile' && deviceWidth <= 768)
    setIsItemsOnly(location.pathname.includes('/profile') && deviceWidth <= 768)
  }, [location.pathname, deviceWidth])

  useEffect(() => {
    switch (location.pathname) {
      case '/profile':
        setSelectedTab(1)
        break
      case '/profile/security':
        setSelectedTab(2)
        break
      case '/profile/myReservations':
        setSelectedTab(3)
        break
      case '/profile/loyaltySpace':
        setSelectedTab(4)
        break
      case '/profile/rates':
        setSelectedTab(5)
        break
      case '/profile/favorites':
        setSelectedTab(6)
        break
      default:
        setSelectedTab(1)
        break
    }
  }, [location])

  const goTo = (ind: number, path: string) => {
    setSelectedTab(ind)
    navigate(path)
  }
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>{capitalizeFirstLetter(connectedUser?.firstName as string)}</span>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      {(!isMenuOnly && !isItemsOnly) && (<NavBar config={{
        isStatic: true,
        rightComponent: deviceWidth > 768 ? profile : undefined,
        middleComponent: deviceWidth > 768 ? searchBar : undefined,
      }} />)}
      <div className='mainProfileContainer'>
        {
          !isItemsOnly && <LeftSide goTo={goTo} selectedTab={selectedTab} />
        }
        {(!isMenuOnly && !isItemsOnly) && <div className='verticalSeparator' />}
        {
          !isMenuOnly && (
            <div className='rightSide'>
              <Outlet />
            </div>
          )
        }
      </div>
    </div>
  )
}

export const LeftSide: React.FC<{ selectedTab?: number, goTo?: Function }> = ({ selectedTab, goTo }) => {
  const dispatch = useDispatch()
  return (
    <div className='leftSide'>
      <div className={`linkCont ${selectedTab === 1 && 'active'}`} onClick={() => goTo && goTo(1, Paths.profile.index)}>
        <img draggable={false} src={profileSVG} alt='' />
        <span>Mon profil</span>
      </div>
      <div className={`linkCont ${selectedTab === 2 && 'active'}`} onClick={() => goTo && goTo(2, '/profile/security')}>
        <img style={{ paddingRight: 'unset', marginLeft: '-7px' }} height={26} width={35} draggable={false} src={shield}
             alt='' />
        <span style={{ paddingLeft: '7px' }}>Mot de passe et sécurité</span>
      </div>
      <div className={`linkCont ${selectedTab === 3 && 'active'}`}
           onClick={() => goTo && goTo(3, '/profile/myReservations')}>
        <img draggable={false} src={ticket} alt='' />
        <span>Mes réservations</span>
      </div>
      <div className={`linkCont ${selectedTab === 4 && 'active'}`}
           onClick={() => goTo && goTo(4, '/profile/loyaltySpace')}>
        <img draggable={false} src={sale} alt='' />
        <span>Mon espace fidélité</span>
      </div>
      <div className={`linkCont ${selectedTab === 5 && 'active'}`} onClick={() => goTo && goTo(5, '/profile/rates')}>
        <img draggable={false} src={chat} alt='' />
        <span>Mes avis</span>
      </div>
      <div className={`linkCont ${selectedTab === 6 && 'active'}`}
           onClick={() => goTo && goTo(6, '/profile/favorites')}>
        <img draggable={false} src={heart} alt='' />
        <span>Mes Favoris</span>
      </div>
      <span className='disconnect' onClick={() => dispatch(logout())}>Se déconnecter</span>
    </div>
  )
}

export default Profile

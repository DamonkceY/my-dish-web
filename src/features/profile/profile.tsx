import './profile.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useState } from 'react'
import { searchBar } from '../market/market'
import Footer from '../../sharedComponents/footer/footer'
import { Outlet, useNavigate } from 'react-router-dom'

import profileSVG from '../../assets/seConnecterNoire.svg'
import ticket from '../../assets/blackTicket.svg'
import sale from '../../assets/sale.svg'
import chat from '../../assets/mesAvisBlack.svg'
import heart from '../../assets/blackHeart.svg'
import shield from '../../assets/shield.svg'
import { Paths } from '../../app/utils/paths/Paths'

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(1)
  const navigate = useNavigate()
  const goTo = (ind: number, path: string) => {
    setSelectedTab(ind)
    navigate(path)
  }
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{ isStatic: true, rightComponent: profile, middleComponent: searchBar }} />
      <div className='mainProfileContainer'>
        <div className='leftSide'>
          <div className={`linkCont ${selectedTab === 1 && 'active'}`} onClick={() => goTo(1, Paths.profile.index)}>
            <img draggable={false} src={profileSVG} alt='' />
            <span>Mon profil</span>
          </div>
          <div className={`linkCont ${selectedTab === 2 && 'active'}`} onClick={() => goTo(2, '/profile/security')}>
            <img style={{paddingRight: 'unset', marginLeft: '-7px'}} height={26} width={35} draggable={false} src={shield} alt='' />
            <span style={{paddingLeft: '7px'}}>Mot de passe et sécurité</span>
          </div>
          <div className={`linkCont ${selectedTab === 3 && 'active'}`} onClick={() => goTo(3, '/profile/myReservations')}>
            <img draggable={false} src={ticket} alt='' />
            <span>Mes réservations</span>
          </div>
          <div className={`linkCont ${selectedTab === 4 && 'active'}`} onClick={() => goTo(4, '/profile/loyaltySpace')}>
            <img draggable={false} src={sale} alt='' />
            <span>Mon espace fidélité</span>
          </div>
          <div className={`linkCont ${selectedTab === 5 && 'active'}`} onClick={() => goTo(5, '/profile/rates')}>
            <img draggable={false} src={chat} alt='' />
            <span>Mes avis</span>
          </div>
          <div className={`linkCont ${selectedTab === 6 && 'active'}`} onClick={() => goTo(6, '/profile/favorites')}>
            <img draggable={false} src={heart} alt='' />
            <span>Mes Favoris</span>
          </div>
          <span className='disconnect' onClick={() => navigate('/')}>Se déconnecter</span>
        </div>
        <div className='verticalSeparator' />
        <div className='rightSide'>
          <Outlet />
        </div>
      </div>
      <div style={{ height: '720px' }} />
      <Footer />
    </div>
  )
}

export default Profile

import './moreDetailModal.scss'
import close from '../../../../assets/close.svg'
import marker from '../../../../assets/blackMarker.svg'
import phone from '../../../../assets/phone.svg'
import React from 'react'
import RestaurantMap from '../restaurantMap/restaurantMap'

const MoreDetailModal: React.FC<{ closeEvent: Function }> = ({ closeEvent }) => {
  return (
    <div className='modalCont'>
      <div className='modalHeader'>
        <span>Plus d'informations</span>
        <img onClick={() => closeEvent()} className='clickable' draggable={false} src={close} alt='' />
      </div>
      <div className='horizontalSeparator' />
      <div className='firstCont'>
        <div className='left'>
          <span className='name'>Joayo Haussmann</span>
          <span className='green'>Horaires d'ouverture</span>
          <p>
            Fermé les dimanches
            <br/>
            Déjeuner : de 12h à 15h
            <br/>
            Dîner : de 19h à 00h
          </p>
          <span className='green'>Contact</span>
          <span>
            <img draggable={false} src={phone} alt='' />
            <span>+33 1 43 48 14 59</span>
          </span>
          <span className='green'>Adresse</span>
          <span>
            <img draggable={false} src={marker} alt='' />
            <span>10 rue Gustave Flaubert, 75017 Paris.</span>
          </span>
          <span className='green'>Caractéristiques</span>
          <span>Cosy, Mesures Covid-19, Asiatique</span>
        </div>
        <RestaurantMap id={'restaurantMoreDetail'} />
      </div>
      <div>
        <span className='green'>Services</span>
        <p>
          American Express, Carte Bleue, Carte Mastercard, Carte Visa
          Restaurant privatisable (60 personnes max.)
          Anglais Parlé, Animaux Bienvenus, Ouvert En Août, Fermé
          Le Dimanche, Privatisable, Wifi.
        </p>
      </div>
    </div>
  )
}

export default MoreDetailModal

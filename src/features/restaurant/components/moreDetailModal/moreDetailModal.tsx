import './moreDetailModal.scss'
import close from '../../../../assets/close.svg'
import marker from '../../../../assets/blackMarker.svg'
import phone from '../../../../assets/phone.svg'
import React from 'react'
import RestaurantMap from '../restaurantMap/restaurantMap'

const MoreDetailModal: React.FC<{ closeEvent: Function, item: any }> = ({ closeEvent, item }) => {
  return (
    <div className='modalCont'>
      <div className='modalHeader'>
        <span>Plus d'informations</span>
        <img onClick={() => closeEvent()} className='clickable' draggable={false} src={close} alt='' />
      </div>
      <div className='horizontalSeparator' />
      <div style={{overflowY: 'auto'}}>
        <div className='firstCont'>
          <div className='left'>
            <span className='name'>{item?.name}</span>
            {/*<span className='green'>Horaires d'ouverture</span>*/}
            {/*<p>*/}
            {/*  Fermé les dimanches*/}
            {/*  <br/>*/}
            {/*  Déjeuner : de 12h à 15h*/}
            {/*  <br/>*/}
            {/*  Dîner : de 19h à 00h*/}
            {/*</p>*/}
            <span className='green'>Contact</span>
            <span>
            <img draggable={false} src={phone} alt='' />
            <span>+33 1 43 48 14 59</span>
          </span>
            <span className='green'>Adresse</span>
            <span>
            <img draggable={false} src={marker} alt='' />
            <span>{item?.address}</span>
          </span>
            <span className='green'>Caractéristiques</span>
            <span>Cosy, Mesures Covid-19, Asiatique</span>
          </div>
          <RestaurantMap item={item} id={'restaurantMoreDetail'} />
        </div>
        <div>
          <span className='green'>Services</span>
          <p>
            {
              item?.description
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoreDetailModal

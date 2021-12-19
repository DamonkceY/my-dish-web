import './shoppingCart.scss'
import NavBar from '../../sharedComponents/navBar/navBar'
import React, { useState } from 'react'
import { searchBar } from '../market/market'
import Footer from '../../sharedComponents/footer/footer'
import swile from '../../assets/swile.jpg'
import edenRed from '../../assets/edenred.jpg'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import close from '../../assets/close.svg'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths/Paths'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '40px',
  boxShadow: 24,
}

const ShoppingCart = () => {
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const profile = (
    <div onClick={() => navigate(Paths.profile.index)} className='profile clickable'>
      <span>Ahmed</span>
    </div>
  )
  return (
    <div style={{ position: 'relative' }}>
      <NavBar config={{ isStatic: true, rightComponent: profile, middleComponent: searchBar }} />
      <div className='shoppingCartContainer'>
        <span className='title'>Réservation • Joayo Haussmann • 2 Pers. sam. 8 août • 20:00</span>
        <div className='horizontalSeparator' />

        <div className='mainCont'>
          <div className='shoppingContainer'>
            <span className='addArticles clickable' onClick={() => navigate(Paths.shop)}>+ Ajouter des articles</span>
            <div className='horizontalSeparator' />
            <div className='shoppingListContainer'>
              <div className='shoppingItem'>
                <div className='cont'>
                  <span className='title'>2 Soupe de nouilles au bœuf piquant</span>
                  <span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>
                  <span className='delete'>Supprimer</span>
                </div>
                <span>24,00 €</span>
              </div>
              <div className='shoppingItem'>
                <div className='cont'>
                  <span className='title'>2 Soupe de nouilles au bœuf piquant</span>
                  <span className='desc'>Vermicelle du riz. sauce tomatePiquante, plus de sauce.</span>
                  <span className='delete'>Supprimer</span>
                </div>
                <span>24,00 €</span>
              </div>
            </div>
            <div className='horizontalSeparator' />
            <div className='shoppingResult'>
              <span>Sous-total</span>
              <span>48,00 €</span>
            </div>
          </div>
          <div />
          <div className='paymentContainer'>
            <span className='paymentMeth'>Moyen de paiement</span>
            <div className='radioEl'>
              <div className='flexRadio'>
                <span className='radio isActive'>
                  <span className='innerRadio isActive' />
                </span>
                <span className='radioLabel'>Carte de crédit ou de débit </span>
                <span className='notif'>Pas de carte enregistrée</span>
              </div>
              {/*<span className='price isActive'>+ 1,00 €</span>*/}
            </div>
            <div className='horizontalSeparator' style={{margin: '35px 0 20px 0'}} />
            <div className='radioEl'>
              <div className='flexRadio'>
                <span className='radio'>
                  <span className='innerRadio' />
                </span>
                <span className='radioLabel'>En espèces</span>
              </div>
              {/*<span className='price isActive'>+ 1,00 €</span>*/}
            </div>
            <div className='horizontalSeparator' />
            <div className='radioEl'>
              <div className='flexRadio'>
                <span className='radio'>
                  <span className='innerRadio' />
                </span>
                <span className='radioLabel'>Bons </span>
              </div>
            </div>
            <div className='horizontalSeparator' />
            <span className='titleRestau'>Titre-restaurant</span>
            <div className='radioEl'>
              <div className='flexRadio'>
                <span className='radio'>
                  <span className='innerRadio' />
                </span>
                <span className='radioLabel'>
                  <img draggable={false} src={edenRed} alt=''/>
                  MyEdenred
                </span>
              </div>
            </div>
            <div style={{height: '20px'}}/>
            <div className='radioEl'>
              <div className='flexRadio'>
                <span className='radio'>
                  <span className='innerRadio' />
                </span>
                <span className='radioLabel'>
                  <img draggable={false} src={swile} alt=''/>
                  Swile
                </span>
              </div>
            </div>
            <button onClick={() => setModal(true)}>Passer au paiement</button>
          </div>
        </div>
      </div>
      <div style={{ height: '720px' }} />
      <Footer />
      <Modal
        open={modal}
        onClose={() => setModal(false)}
      >
        <Box sx={style}>
          <div className='addBankAccount'>
            <div className='cont'>
              <div className='head'>
                <span>Ajouter une carte</span>
                <img onClick={() => setModal(false)} className='clickable' draggable={false} src={close} alt=''/>
              </div>
              <div className='horizontalSeparator'/>
              <div className='inputs'>
                <div className='inputCont'>
                  <span>Numéro de carte</span>
                  <input type='text' name='' id=''/>
                </div>
                <div className='inputCont'>
                  <span>Date d’expiration</span>
                  <input placeholder='MM/AA' type='text' name='' id=''/>
                </div>
                <div className='inputCont'>
                  <span>Code de sécurité</span>
                  <input placeholder='Code de 3 chiffres situé au dos de la carte' type='text' name='' id=''/>
                </div>
                <div className='inputCont'>
                  <span>Pays</span>
                  <input value='France' type='text' name='' id=''/>
                </div>
              </div>
            </div>
            <div style={{height: '150px'}}/>
            <button onClick={() => setModal(false)}>Suivant</button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ShoppingCart

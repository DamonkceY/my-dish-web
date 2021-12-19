import React, { useState } from 'react'
import pizza from '../../../../assets/pizza.png'
import updateSVG from '../../../../assets/modifier.svg'
import deleteSVG from '../../../../assets/supprimer.svg'
import Slider from '@mui/material/Slider'
import './myRates.scss'
import { setShoppingModal } from '../../../../app/store/storeModules/root/root'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import close from '../../../../assets/close.svg'

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

const MyRates = () => {
  const [modelData, setModelData] = useState(false)

  return (
    <div>
      <div className='profileHeaderContainer'>
        <span>Mes avis</span>
      </div>
      <div className='horizontalSeparator' />

      <div className='ratesContainer'>
        <RateComp openModal={() => setModelData(true)} />
        <RateComp openModal={() => setModelData(true)} />
        <RateComp openModal={() => setModelData(true)} />
      </div>

      <Modal
        open={modelData}
        onClose={() => setModelData(false)}
      >
        <Box sx={style}>
          <div className='rateModal'>
            <div className='modalHeader'>
              <span>Modifier l'avis</span>
              <img onClick={() => setModelData(false)} className='close clickable' src={close} alt='' />
            </div>
            <div className='horizontalSeparator' />
            <div className='slider'>
              <span className='note'>Note</span>
              <Slider aria-label='Small' valueLabelDisplay='auto' defaultValue={9.5} step={0.5} min={1} max={10} />
            </div>
            <div className='title'>
              <span>Titre de l'avis</span>
              <input value='Succulent !!!' type='text' />
            </div>
            <div className='rate'>
              <span>Avis</span>
              <textarea
                value='Un restaurant coréen à recommander. Le cadre est moderne et aéré. Mention spéciale pour les entrées: poulet grillé, galette de kimchi et les nouilles japchae.. Le service est aimable. Très bon rapport qualité-prix.Un restaurant coréen à recommander. Le cadre est moderne et aéré. Mention spéciale pour les entrées: poulet grillé, galette de kimchi et les nouilles japchae.. Le service est aimable. Très bon rapport qualité-prix.'
                rows={7} />
            </div>
            <div style={{height: '50px'}}/>
            <button onClick={() => setModelData(false)}>Valider</button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const RateComp: React.FC<{ openModal: Function }> = ({ openModal }) => {

  return (
    <div className='rateCont'>
      <img draggable={false} src={pizza} alt='' />
      <div className='mainCont'>
        <div className='cardHeader'>
          <div className='head'>
            <span className='title'>Joayo Haussmann</span>
            <span className='speciality'>Italien</span>
          </div>
          <div>
            <img onClick={() => openModal()} className='clickable' src={updateSVG} alt='' />
            <img className='clickable' src={deleteSVG} alt='' />
          </div>
        </div>
        <div className='cardMid'>
          <div className='mid'>
            <div className='rateTitle'>
              <span>Délicieux!</span>
              <span className='date'>22/07/2020</span>
            </div>
            <span className='rateNumber'>9.5 <span className='outOfTen'>/ 10</span></span>
          </div>
          <div className='cardDesc'>
            Belle découverte et joli cadre. Raviolis excellents et barbecue de canard et porc épicés super. Bon
            cheesecake au yuzu et belle présentation. Apéritif vin de mûre original.
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyRates

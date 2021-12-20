import Box from '@mui/material/Box'
import close from '../../assets/close.svg'
import pizza from '../../assets/pizzaNoBorder.png'
import plusActive from '../../assets/plusActive.svg'
import plusInActive from '../../assets/plusInActive.svg'
import moinActive from '../../assets/moinActive.svg'
import moinInActive from '../../assets/moinInActive.svg'

import Modal from '@mui/material/Modal'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/store/hooks'
import { selectShoppingModal, setShoppingModal } from '../../app/store/storeModules/root/root'
import { useDispatch } from 'react-redux'
import './modal.scss'
import { Paths } from '../../app/utils/paths/Paths'
import { useNavigate } from 'react-router-dom'

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

const ShoppingModal = () => {
  const selector = useAppSelector(selectShoppingModal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [count, setCount] = useState(1)
  const increment = (inc: number) => {
    if(inc > 0 && count === 1){
      setCount(count + inc)
    }
    if(inc < 0 && count === 2){
      setCount(count + inc)
    }
  }
  return (
    <div>
      <Modal
        open={selector}
        onClose={() => dispatch(setShoppingModal(false))}
      >
        <Box sx={style}>
          <div className='shoppingModalContainer'>
            <div className='shoppingModalHeader'>
              <img onClick={() => dispatch(setShoppingModal(false))} className='close clickable' src={close} alt='' />
            </div>
            <div className='cont'>
              <div className='shoppingModalDescription'>
                <span className='shoppingModalDescriptionTitle'>Soupe de nouilles au bœuf piquant</span>
                <span>
                Pâtes fraîches au choix. Sauce tomate, basilic, piment et parmesan.
              </span>
              </div>
              <div className='horizontalSeparator' />
              <div className='shoppingModalChoices'>
                <span className='title'>Pâtes au choix</span>
                <span>Obligatoire</span>
                <div className='radioElements'>
                  <div className='radioEl'>
                    <div className='flexRadio'>
                    <span className='radio isActive'>
                      <span className='innerRadio isActive'/>
                    </span>
                      <span className='radioLabel'>Vermicelle du riz</span>
                    </div>
                    <span className='price isActive'>+ 1,00 €</span>
                  </div>
                  <div className='radioEl'>
                    <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio'/>
                    </span>
                      <span className='radioLabel'>Vermicelle du riz</span>
                    </div>
                    <span className='price'>+ 1,00 €</span>
                  </div>
                  <div className='radioEl'>
                    <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio'/>
                    </span>
                      <span className='radioLabel'>Vermicelle du riz</span>
                    </div>
                    <span className='price'>+ 1,00 €</span>
                  </div>
                  <div className='radioEl'>
                    <div className='flexRadio'>
                    <span className='radio'>
                      <span className='innerRadio'/>
                    </span>
                      <span className='radioLabel'>Vermicelle du riz</span>
                    </div>
                    <span className='price'>+ 1,00 €</span>
                  </div>
                </div>
              </div>
              <div className='horizontalSeparator' />
              <div className='shoppingModalSpecialInstruction'>
                <span>Instructions spéciales </span>
                <textarea placeholder={'Ajouter une remarque ou une instruction spéciale'} rows={3}/>
              </div>
            </div>
            <div className='shoppingModalFooter'>
              <div className='shoppingModalFooterSettings'>
                <img onClick={() => increment(-1)} className={count === 1 ? 'unClickable' : 'clickable'} draggable={false} src={count === 1 ? moinInActive : moinActive} alt='' />
                <span>{count}</span>
                <img onClick={() => increment(1)} className={count === 2 ? 'unClickable' : 'clickable'} draggable={false} src={count === 2 ? plusInActive : plusActive} alt='' />
              </div>
              <button onClick={() => {
                dispatch(setShoppingModal(false))
                navigate(Paths.shop)
              }}>
                <span>Ajouter à la commande</span>
                <span>+ 12,00 € </span>
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ShoppingModal

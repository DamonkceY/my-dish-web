import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React, { useEffect } from 'react'
import { useAppSelector } from '../../app/store/hooks'
import { selectDeviceWidth, selectShoppingModal, setShoppingModal } from '../../app/store/storeModules/root/root'
import { useDispatch } from 'react-redux'
import './modal.scss'
import Body from './comp/body'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

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
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const dispatch = useDispatch()

  return (
    <div>
      {deviceWidth <= 768 ? (
        <BottomSheet onDismiss={() => dispatch(setShoppingModal(null))} open={!!selector}>
          <Body item={selector} />
        </BottomSheet>
      ) : (
        <Modal
          open={!!selector}
          onClose={() => dispatch(setShoppingModal(null))}
        >
          <Box sx={style}>
            <Body item={selector} />
          </Box>
        </Modal>
      )}
    </div>
  )
}

export default ShoppingModal

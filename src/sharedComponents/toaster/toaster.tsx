import { useAppDispatch } from '../../app/store/hooks'
import { deleteFromToastsArray, ToastInterface } from '../../app/store/storeModules/root/root'
import React, { useEffect, useRef } from 'react'
import './toaster.scss'

const Toaster: React.FC<{ toast: ToastInterface, index: number }> = ({ toast, index }) => {

  const dispatch = useAppDispatch()
  const timeout = useRef<any>(null)
  useEffect(() => {
    timeout.current = setTimeout(() => {
      dispatch(deleteFromToastsArray(toast.uniqueId))
    }, 3000)

    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  return (
    <div>
      <div onClick={() => dispatch(deleteFromToastsArray(toast.uniqueId))}
           className={`toasterMainContainer ${toast.type}`}
            style={{ top: `${index*100+10}px` }}>
        <div className={'toasterMessage'}>
          {toast.message}
        </div>
      </div>
    </div>
  )
}


export default Toaster

/*
*
* Made with love by Med Chouiref, A.K.A DamonkceY
*
* */

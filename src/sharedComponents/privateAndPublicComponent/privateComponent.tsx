import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../app/store/hooks'
import { selectConnectedUser } from '../../app/store/storeModules/authentication/authenticationSlice'
import { getProfileByToken } from '../../app/store/storeModules/authentication/authenticationService'
import { Navigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'

export interface PrivateCompInterface {
  component: JSX.Element;
}

const PrivateComp: React.FC<{config: PrivateCompInterface}> = ({config}) => {


  const connectedUser = useAppSelector(selectConnectedUser)
  const token = useRef(localStorage.getItem('myDishWeb'))
  const [passport, setPassport] = useState({
    requestIsFinished: !!connectedUser && !!token.current,
    userIsConnected: !!connectedUser && !!token.current
  })

  useEffect(() => {
    if(!connectedUser && !!token.current) {
      getProfileByToken().then(() => {
        setPassport({
          requestIsFinished: true,
          userIsConnected: true
        })
      }).catch(() => {
        setPassport({
          requestIsFinished: true,
          userIsConnected: false
        })
      })
    }else if(!token.current) {
      setPassport({
        requestIsFinished: true,
        userIsConnected: false
      })
    }
  }, [])

  return (
    <div>
      {
        passport.requestIsFinished && (
          <div>
            {
              passport.userIsConnected ? (
                config.component
              ) : (
                <Navigate to={Paths.auth.index}/>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default PrivateComp

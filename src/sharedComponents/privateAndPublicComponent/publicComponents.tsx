import React, { useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { Paths } from '../../app/utils/paths'
import { PrivateCompInterface } from './privateComponent'

const PublicComp: React.FC<{ config: PrivateCompInterface }> = ({ config }) => {

  const token = useRef(localStorage.getItem('myDishWeb'))

  return (
    <div>
      {
        !token.current || token.current === '' ? (
          config.component
        ) : (
          <Navigate to={Paths.home} />
        )
      }
    </div>
  )
}

export default PublicComp

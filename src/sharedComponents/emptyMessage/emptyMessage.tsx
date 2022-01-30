import './emptyMessage.scss'
import React from 'react'

const EmptyMessage: React.FC<{ config: { title: string; text?: string } }> = ({ config }) => {
  return (
    <div className={'emptyMessageContainer'}>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <span className={'title'}>{config.title}</span>
        <span>{config.text}</span>
      </div>
    </div>
  )
}


export default EmptyMessage

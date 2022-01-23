import './emptyMessage.scss'
import React from 'react'

const EmptyMessage:React.FC<{config: {title: string; text?:string}}> = ({config}) => {
  return (
    <div className={'emptyMessageContainer'}>
      <span className={'title'}>{config.title}</span>
      <span>{config.text}</span>
    </div>
  )
}


export default EmptyMessage

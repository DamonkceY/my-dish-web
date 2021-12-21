import './selectItem.scss'

import checked from '../../../assets/checked.svg'
import unChecked from '../../../assets/unChecked.svg'
import React, { useState } from 'react'

export interface selectItemInterface {
  icon?: string;
  title: string;
}
const SelectItem: React.FC<{config: selectItemInterface}> = ({config}) => {
  const [isChecked, setChecked] = useState(false)

  return (
    <div onClick={() => setChecked(!isChecked)} className='ssCont'>
      <div className='nameCont'>
        { config?.icon && <img src={config?.icon} alt=''/> }
        <span>{config.title}</span>
      </div>
      <img src={isChecked ? checked : unChecked} alt=''/>
    </div>
  )
}

export default SelectItem

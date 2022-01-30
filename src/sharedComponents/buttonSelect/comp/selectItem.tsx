import './selectItem.scss'

import checked from '../../../assets/checked.svg'
import unChecked from '../../../assets/unChecked.svg'
import React, { useEffect, useState } from 'react'

export interface selectItemInterface {
  icon?: string;
  onSelect?: Function;
  item: any;
}
const SelectItem: React.FC<{config: selectItemInterface}> = ({config}) => {
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(config?.item?.isChecked)
  }, [config])

  const check = () => {
    config?.onSelect && config?.onSelect({...config?.item, isChecked: !config?.item?.isChecked})
    setChecked(!isChecked)
  }
  return (
    <div onClick={check} className='ssCont'>
      <div className='nameCont'>
        { config?.icon && <img src={config?.icon} alt=''/> }
        <span>{config.item?.name}</span>
      </div>
      <img src={isChecked ? checked : unChecked} alt=''/>
    </div>
  )
}

export default SelectItem

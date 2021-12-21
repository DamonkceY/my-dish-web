import './buttonSelect.scss'
import arrowDown from '../../assets/down-arrow.svg'
import vegetarian from '../../assets/vegetarien.svg'
import React, { useEffect, useRef, useState } from 'react'
import SelectItem from './comp/selectItem'

export interface ButtonSelectInterface {
  title: string,
  icon?: string,
  iconStyle?: any,
}

const ButtonSelect: React.FC<{config: ButtonSelectInterface}> = ({config}) => {
  const [isOpen, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div>
      <div className='selectButtonCont clickable'>
        <span onClick={() => setOpen(!isOpen)}>{config.title}</span>
        <img onClick={() => setOpen(!isOpen)} className='filterBy' style={config?.iconStyle} draggable={false} src={config.icon ? config.icon : arrowDown} alt=''/>


        <div ref={wrapperRef} className={`selectButtonPopUp ${isOpen}`}>
          <SelectItem config={{title: 'Example', icon: vegetarian}}/>
          <SelectItem config={{title: 'Example', icon: vegetarian}}/>
          <SelectItem config={{title: 'Example', icon: vegetarian}}/>
          <SelectItem config={{title: 'Example', icon: vegetarian}}/>
        </div>
      </div>
    </div>
  )
}

export default ButtonSelect

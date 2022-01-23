import React, { useEffect, useRef, useState } from 'react'
import './phoneNumberInput.scss'
import 'react-phone-input-2/lib/bootstrap.css'
import { useTranslation } from 'react-i18next'
import downArrow from '../../assets/down-arrow.svg'
import searchGlass from '../../assets/searchGlass.svg'
import { countriesDials } from '../../app/consts/countriesData'
import { Validator } from '../inputField/validator'
import { Rules } from '../../app/utils/interfaces/rules'

export interface PhoneNumberInterface {
  label: string;
  placeholder: string;
  onChange: Function;
  defaultValue?: {
    number?: number,
    country?: CountryDataInterface
  }
}

export interface CountryDataInterface {
  name: string;
  dialCode: string;
  isoCode: string;
  flag: string;
}

const PhoneNumberInput: React.FC<{ config: PhoneNumberInterface }> = ({ config }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryDataInterface>(config?.defaultValue?.country || countriesDials[73])
  const { t } = useTranslation()
  const [isOpen, setOpen] = useState(false)
  const [filteredList, setFilteredList] = useState(countriesDials)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const value = useRef<string | number>(NaN)
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const toggleList = () => {
    setOpen(!isOpen)
  }

  const filterArray = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredList(countriesDials.filter((item) =>
      (item.name.toLowerCase().trim() + `(${item.dialCode})`).includes(event.target.value?.trim()?.toLowerCase()),
    ))
  }

  const rules: Rules = {
    pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    required: true,
  }

  const changedInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    value.current = event.target.value
    const result = Validator(value.current, rules)
    result.length === 0 ? config.onChange({ number: value.current, country: selectedCountry }) : config.onChange({ number: NaN, country: selectedCountry })
  }

  useEffect(() => {
    if (value.current !== undefined) {
      const result = Validator(value.current, rules)
      result.length === 0 ? config.onChange({ number: value.current, country: selectedCountry }) : config.onChange({ number: NaN, country: selectedCountry })
    }
  }, [selectedCountry])
  return (
    <div className='phoneNumberContainer'>
      <label>
        {t(config.label)}
      </label>
      <div className='main'>
        <div className='cont'>
          <div className='leftSide clickable' onClick={toggleList}>
            <img className='flag' draggable={false} src={selectedCountry.flag} alt='' />
            <span style={{ width: '10px' }} />
            <span style={{ width: '42px' }}>{selectedCountry.dialCode}</span>
            <span style={{ width: '10px' }} />
            <img className='arrow' draggable={false} src={downArrow} alt='' />
          </div>
          <input type='number' defaultValue={config?.defaultValue?.number} placeholder={t(config.placeholder)} onChange={changedInput} />
        </div>
        <div ref={wrapperRef} style={{ display: isOpen ? 'unset' : 'none' }} className='select'>
          <div className='search'>
            <img draggable={false} src={searchGlass} alt='' />
            <input onChange={filterArray} type='text' placeholder='recherche par pays ou code' />
          </div>
          <div className='horizontalSeparator' />
          <div className='selectList'>
            {
              filteredList.map((item) => (
                <div key={item.isoCode}
                     style={selectedCountry.isoCode === item.isoCode ? { backgroundColor: 'rgb(241 245 248)' } : {}}
                     onClick={() => setSelectedCountry(item)}>
                  <img className='flag' draggable={false} src={item.flag} alt='' />
                  <span>{item.name} <span>({item.dialCode})</span></span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneNumberInput

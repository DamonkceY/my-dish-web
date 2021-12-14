import React from 'react'
import './phoneNumberInput.scss'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { useTranslation } from 'react-i18next'

const PhoneNumberInput: React.FC<{config: {label: string, placeholder: string}}> = ({config}) => {
  const {t} = useTranslation();
  return (
    <div className='phoneNumberContainer'>
      <label>
        { t(config.label) }
      </label>
      <PhoneInput />
    </div>
  )
}

export default PhoneNumberInput

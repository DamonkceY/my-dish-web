import React, { useRef, useState } from 'react'
import './inputField.scss'
import successValidator from '../../assets/select.svg'
import see from '../../assets/see.svg'
import seeDisabled from '../../assets/seeDisabled.svg'
import { Rules } from '../../app/utils/interfaces/rules'
import { Validator } from './validator'
import { useTranslation } from 'react-i18next'

export interface InputFieldInterface {
  rules?: Rules;
  type: 'text' | 'number' | 'password';
  label: string,
  placeholder: string,
}

const InputField: React.FC<{ config: InputFieldInterface }> = ({ config }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const value = useRef<undefined | string | number>(undefined)
  const { t } = useTranslation()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    value.current = event.target.value
    setIsValid(Validator(event.target.value))
  }

  const getType = () => {
    if (config.type !== 'password') return config.type
    return showPassword ? 'text' : 'password'
  }

  return (
    <div className='mainContainer'>
      <label>
        {t(config.label)}
      </label>
      <div className='inputContainer'>
        <input
          tabIndex={-1}
          onChange={onChange}
          // ${isValid ? 'success' : 'error'}
          className={`inputValidatorState `}
          type={getType()}
          placeholder={t(config?.placeholder)} />
        {config.type === 'password' && <img
          draggable={false}
          onClick={() => setShowPassword(!showPassword)}
          className='passwordSeeIcon'
          src={showPassword ? see : seeDisabled}
          alt=''
        />}
        {/*{isValid && <img*/}
        {/*  draggable={false}*/}
        {/*  className='validatorSuccessIcon'*/}
        {/*  src={successValidator}*/}
        {/*  alt=''*/}
        {/*/>}*/}
      </div>
    </div>
  )
}

export default InputField

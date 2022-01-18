import React, { useEffect, useRef, useState } from 'react'
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
  labelSalt?: string,
  defaultValue?: string | number,
  onChange: Function,
  onInit?: Function
}

const InputField: React.FC<{ config: InputFieldInterface }> = ({ config }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const value = useRef<undefined | string | number>(undefined)
  const { t } = useTranslation()

  useEffect(() => {
    config.onInit && config.onInit()
  }, [])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    value.current = event.target.value
    const result = Validator(value.current.toString().trim(), config.rules)
    result.length === 0 ? config.onChange(value.current.toString().trim()) : config.onChange('')
  }

  const getType = () => {
    if (config.type !== 'password') return config.type
    return showPassword ? 'text' : 'password'
  }

  return (
    <div className='mainContainer'>
      <label>
        {`${t(config.label)} ${config.labelSalt ? config.labelSalt : ''}`}
      </label>
      <div className='inputContainer'>
        <input
          defaultValue={config?.defaultValue}
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

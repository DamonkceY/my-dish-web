import React from 'react'
import './button.scss'
import { useTranslation } from 'react-i18next'

export interface ButtonInterface {
  onClick: Function;
  isEnabled: boolean;
  text: string;
}

const Button: React.FC<{ config: ButtonInterface }> = ({ config }) => {
  const { t } = useTranslation()
  return (
    <button onClick={() => config.onClick()} disabled={!config?.isEnabled} className={`${config?.isEnabled && 'success'}`}>{t(config?.text)}</button>
  )
}

export default Button

import './myProfile.scss'
import React, { useEffect, useRef, useState } from 'react'
import avatar from '../../../../assets/avatar2.svg'
import backArrow from '../../../../assets/back.svg'
import { useAppSelector } from '../../../../app/store/hooks'
import { selectDeviceWidth } from '../../../../app/store/storeModules/root/root'
import { useNavigate } from 'react-router-dom'
import { selectConnectedUser } from '../../../../app/store/storeModules/authentication/authenticationSlice'
import { capitalizeFirstLetter } from '../../../../app/utils/func/commonFuncs'
import { UpdateProfileInterface } from '../../../../app/utils/interfaces/apiInterfaces/authInterfaces'
import { emailRegex } from '../../../../app/consts/regex'
import { updateProfileRequest } from '../../../../app/store/storeModules/authentication/authenticationService'

const required = (key: string) => `${key} est obligatoire`
const notValid = (key: string) => `${key} n\'est pas valide`
const isMissing = (key?: string | null) => !key || key.toString().trim().length === 0

const getValidation = (data: UpdateProfileInterface) => ({
  firstName: isMissing(data?.firstName) ? required('Le nom') : null,
  lastName: isMissing(data?.lastName) ? required('Le prénom') : null,
  address: isMissing(data?.address) ? required('L\'adresse') : null,
  postalCode: isMissing(data?.postalCode) ? required('Le code postale') : null,
  country: isMissing(data?.country) ? required('Le pays') : null,
  email: isMissing(data?.email) ? required('L\'adresse E-mail') : !emailRegex.test(data?.email) ? notValid('L\'adresse E-mail') : null,
})

const MyProfile = () => {

  const navigate = useNavigate()
  const deviceWidth = useAppSelector(selectDeviceWidth)
  const connectedUser = useAppSelector(selectConnectedUser)
  const [isUpdate, setIsUpdating] = useState(false)
  const [updateValidation, setUpdateValidation] = useState(getValidation(connectedUser as UpdateProfileInterface))
  const getInitialValues = () => ({
    firstName: connectedUser?.firstName || '',
    lastName: connectedUser?.lastName || '',
    address: connectedUser?.address || '',
    postalCode: connectedUser?.postalCode || '',
    country: connectedUser?.country || '',
    email: connectedUser?.email || '',
  })
  const [formData, setFormData] = useState(getInitialValues())

  const prepareUpdateForm = (isUpdating: boolean) => {
    setIsUpdating(isUpdating)
    document.getElementById('firstInput')?.focus()
    !isUpdating && setFormData({ ...getInitialValues() })
  }

  const onChangeForm = (value: string, key: string) => {
    const temp = { ...formData } as any
    temp[key] = value
    setFormData(temp)
    setUpdateValidation(getValidation(temp as UpdateProfileInterface))
  }

  const submitUpdate = () => {
    updateProfileRequest(formData).then(() => {
      setIsUpdating(false)
    })
  }

  useEffect(() => {
    !isUpdate && setUpdateValidation(getValidation(connectedUser as UpdateProfileInterface))
  }, [isUpdate])
  return (
    <div>
      <div className='profileHeaderContainer'>
        <span onClick={() => {
          deviceWidth <= 768 && navigate(-1)
        }}>
          {deviceWidth <= 768 && <img style={{ margin: '0 10px 0 0' }} draggable={false} src={backArrow} alt='' />}
          <span>Mon profil</span>
        </span>
        {!isUpdate && <span className='update' onClick={() => prepareUpdateForm(true)}>Modifier</span>}
      </div>
      <div style={{ margin: '20px 0' }} className='horizontalSeparator' />
      <div className='profileInputs'>
        <AvatarWithName withMargin={true}/>
        <div className='inputs'>
          <div className='inputCont'>
            <span>Nom</span>
            <input
              readOnly={!isUpdate}
              tabIndex={-1}
              placeholder={'Votre nom'}
              onChange={(e) => onChangeForm(e.target.value, 'firstName')}
              value={formData?.firstName}
              type='text'
              id='firstInput'
            />
            {
              isUpdate && (
                <span className='validationMessage'>
                  {updateValidation.firstName}
                </span>
              )
            }
          </div>
          <div className='inputCont'>
            <span>Prénom</span>
            <input
              readOnly={!isUpdate}
              tabIndex={-1}
              placeholder={'Votre prénom'}
              onChange={(e) => onChangeForm(e.target.value, 'lastName')}
              value={formData?.lastName}
              type='text'
            />
            {
              isUpdate && (
                <span className='validationMessage'>
                  {updateValidation.lastName}
                </span>
              )
            }
          </div>
          <div className='inputCont'>
            <span>Adresse</span>
            <input
              readOnly={!isUpdate}
              tabIndex={-1}
              placeholder={'Votre Adresse'}
              onChange={(e) => onChangeForm(e.target.value, 'address')}
              className='address'
              value={formData?.address}
              type='text'
            />
            {
              isUpdate && (
                <span className='validationMessage'>
                  {updateValidation.address}
                </span>
              )
            }
          </div>
          <div className='inputCont'>
            <span>Code postal</span>
            <input
              readOnly={!isUpdate}
              tabIndex={-1}
              placeholder={'Votre code postale'}
              onChange={(e) => onChangeForm(e.target.value, 'postalCode')}
              value={formData?.postalCode}
              type='text'
            />
            {
              isUpdate && (
                <span className='validationMessage'>
                  {updateValidation.postalCode}
                </span>
              )
            }
          </div>
          <div className='inputCont'>
            <span>Pays</span>
            <input
              readOnly={!isUpdate}
              tabIndex={-1}
              placeholder={'Votre pays'}
              onChange={(e) => onChangeForm(e.target.value, 'country')}
              value={formData?.country}
              type='text'
            />
            {
              isUpdate && (
                <span className='validationMessage'>
                  {updateValidation.country}
                </span>
              )
            }
          </div>
          <div className='inputCont'>
            <span>E-mail</span>
            <input
              readOnly={!isUpdate}
              tabIndex={-1}
              placeholder={'Votre adresse email'}
              onChange={(e) => onChangeForm(e.target.value, 'email')}
              value={formData?.email}
              type='text'
            />
            {
              isUpdate && (
                <span className='validationMessage'>
                  {updateValidation.email}
                </span>
              )
            }
          </div>
          {/*<div className='inputCont'>*/}
          {/*  <span>Carte bancaire</span>*/}
          {/*  <input tabIndex={-1} value='visa 1411 ' className='bankAcc' type='text' name='' id='' />*/}
          {/*</div>*/}
        </div>
        {
          isUpdate && (
            <div className={'updateButtons'}>
              <button
                disabled={!(Object.values(updateValidation).filter(item => !!item).length === 0)}
                onClick={submitUpdate}
                className={`btn ${Object.values(updateValidation).filter(item => !!item).length === 0 && 'success'}`}
              >
                Valider
              </button>
              <span style={{ padding: '10px' }} />
              <button onClick={() => prepareUpdateForm(false)} className={'btn success cancel'}>Annuler</button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export const AvatarWithName:React.FC<{withMargin?: boolean}> = ({ withMargin }) => {
  const connectedUser = useAppSelector(selectConnectedUser)
  return (
    <div className={`avatarWithName ${withMargin ? 'withMargin' : ''}`}>
      <img draggable={false} src={avatar} alt='' />
      <div className='desc'>
            <span
              className='name'>{`${capitalizeFirstLetter(connectedUser?.firstName as string)} ${capitalizeFirstLetter(connectedUser?.lastName as string)}`}</span>
        <span>{connectedUser?.telephone}</span>
      </div>
    </div>
  )
}

export default MyProfile

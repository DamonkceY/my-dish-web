import {
  ChangePasswordInterface, confirmPhoneNumberInterface,
  RegisterDataInterface,
  SimpleLoginDataInterface, UpdateProfileInterface,
} from '../../../utils/interfaces/apiInterfaces/authInterfaces'
import { Executor } from '../../../utils/executor'
import { authEndpoints } from '../../../utils/endpoints'
import { mapObjectToInterface } from '../../../utils/func/commonFuncs'
import UserModelInterface, { userModelKeys } from '../../../utils/interfaces/modelsInterfaces/User'
import { store } from '../../store'
import { setConnectedUser } from './authenticationSlice'


export const getProfileByToken = () => {
  return Executor({
    method: 'get',
    payloadData: null,
    endPoint: authEndpoints.getMyProfile,
    successFunc: (data: any) => {
      store.dispatch(setConnectedUser(mapObjectToInterface(data, userModelKeys) as UserModelInterface))
    },
  })
}

export const loginRequest = (data: SimpleLoginDataInterface) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: authEndpoints.login,
    successFunc: (data: {
      user: any,
      token: string
    }) => {
      store.dispatch(setConnectedUser(mapObjectToInterface(data.user, userModelKeys) as UserModelInterface))
      localStorage.setItem('myDishWeb', data.token)
    },
  })
}

export const registerRequest = (data: RegisterDataInterface) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: authEndpoints.register,
  })
}

export const changePasswordRequest = (data: ChangePasswordInterface) => {
  return Executor({
    method: 'put',
    payloadData: data,
    endPoint: authEndpoints.changePassword,
  })
}

export const updateProfileRequest = (data: UpdateProfileInterface) => {
  return Executor({
    method: 'put',
    payloadData: data,
    endPoint: authEndpoints.updateProfile,
    successFunc: (data: any) => {
      store.dispatch(setConnectedUser(mapObjectToInterface(data, userModelKeys) as UserModelInterface))
    },
  })
}

export const confirmPhoneNumber = (data: confirmPhoneNumberInterface) => {
  return Executor({
    method: 'post',
    payloadData: data,
    endPoint: authEndpoints.confirmPhoneNumber,
  })
}

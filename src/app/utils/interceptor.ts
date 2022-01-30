import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'
import { store } from '../store/store'
import { logout } from '../store/storeModules/authentication/authenticationSlice'

const Interceptor = axios.create({
  timeout: 20000,
})

Interceptor.interceptors.request.use((config) => {
  (config.headers as Record<any, any>).common = {
    Authorization: !!localStorage.getItem('myDishWeb') ? `Bearer ${localStorage.getItem('myDishWeb')}` : '',
    'x-localization': !!localStorage.getItem('LANGUAGE') ? localStorage.getItem('LANGUAGE') : 'fr',
    'Content-Type': 'application/json',
  }

  return config
})

Interceptor.interceptors.response.use(
  (response: AxiosResponse<any>) => (response),
  async (error: AxiosError) => {
    switch (error.response?.status) {
      case 404:
      case 401:
        console.log(error)
        debugger
        store.dispatch(logout())
        return error.response
      case 403:
        console.log(error)
        debugger
        return error.response
      default:
        console.log(error)
        debugger
        // store.dispatch(logout())
        console.log(error)
        break

    }
  },
)

export default Interceptor



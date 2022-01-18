import axios from 'axios'
import { AxiosResponse, AxiosError } from 'axios'

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
        return error.response
      case 403:
        return error.response
      default:
        debugger;
        break

    }
  },
)

export default Interceptor



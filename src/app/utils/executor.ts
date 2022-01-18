import Interceptor from './interceptor';
import {AxiosResponse, AxiosError} from "axios";
import { AppThunk, store } from '../store/store'
import { setRootLoading } from '../store/storeModules/root/root'
import { baseUrl } from './endpoints'

export interface ExecutorInterface {
  method: 'get' | 'post' | 'put' | 'delete',
  endPoint: string,
  payloadData: any,
  successFunc?: Function,
}

// : AppThunk => (
//   dispatch,
//     getState
// )

export const Executor = (config: ExecutorInterface) => {
  store.dispatch(setRootLoading(true));
  return new Promise((resolve, reject) => {
    Interceptor({
      url: baseUrl + config.endPoint,
      method: config.method,
      data: config.payloadData
    }).then((response: AxiosResponse<any>) => {
      if(response.status === 200) {
        config.successFunc && config.successFunc(response.data.data)
        store.dispatch(setRootLoading(false));
        resolve(response.data)
      }else {
        store.dispatch(setRootLoading(false));
        reject(response.data)
      }
    }).catch((error) => {
      store.dispatch(setRootLoading(false));
      reject(error);
    })
  })
}



/*
*
* Made with love by Med Chouiref, A.K.A DamonkceY
*
* */

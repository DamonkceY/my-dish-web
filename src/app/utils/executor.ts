import Interceptor from './interceptor';
import {AxiosResponse, AxiosError} from "axios";

export interface ExecutorInterface {
  method: 'get' | 'post' | 'put' | 'delete',
  endPoint: string,
  payloadData: any,
}

export const Executor = (config: ExecutorInterface) => {
  return new Promise((resolve, reject) => {
    Interceptor({
      url: config.endPoint,
      method: config.method,
      data: config.payloadData
    }).then((response: AxiosResponse<any>) => {
      // TODO response mapping;
    }).catch((error: AxiosError<any>) => {
      // TODO error handling
    })
  })
}

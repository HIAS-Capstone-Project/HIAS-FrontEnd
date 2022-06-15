import { AxiosError, AxiosResponse } from 'axios';

export function handleError(response: AxiosResponse, callback: any) {
  const { data, status } = response;

  if (callback) {
    callback(status, response?.data);
  }
  return Promise.reject({ status, error: data.errors });
}

export const errorInterceptor = (error: AxiosError, callback: any) => {
  const { response } = error;
  if (response) {
    handleError(response, callback);
  }
  return Promise.reject(error);
};

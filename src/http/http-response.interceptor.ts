import { AxiosResponse } from 'axios';

const responseInterceptor = (
  response: AxiosResponse,
  callback: any,
): Promise<any> => {
  const { status, data } = response;

  if (callback) {
    callback(status, data);
  }
  return Promise.resolve(data);
};

export default responseInterceptor;

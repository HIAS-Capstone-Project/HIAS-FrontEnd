import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { DEFAULT_CONFIG, BASE_URL } from 'config/http-config';
import { LocalStorageUtil } from 'utils';
import { errorInterceptor } from './http-error.interceptor';
import responseInterceptor from './http-response.interceptor';

export type HttpResponse<T> = {
  data: T | null;
};

class HttpProvider {
  private readonly axiosInstance: AxiosInstance;

  private token?: string;

  private baseUrl?: string;

  private apiStatus?: number;

  private apiUrl?: string;

  static instance: HttpProvider;

  static default() {
    if (!HttpProvider.instance) {
      HttpProvider.instance = new HttpProvider();
    }
    return HttpProvider.instance;
  }

  initAuthorization = () => {
    const session = LocalStorageUtil.getSessionInfo();
    if (session.token) {
      this.token = session.token;
      this.axiosInstance.defaults.headers.common.Authorization = session.token;
    }
  };

  constructor() {
    this.axiosInstance = axios.create(DEFAULT_CONFIG);
    this.initAuthorization();
    this.baseUrl = BASE_URL;
  }

  // refreshToken = (response: AxiosResponse, callback: any): Promise<any> => {
  //   const {status, data, config } = response;
  //   this.apiStatus = status;

  //   if (status === 200) &&
  // }

  setupInterceptors = (callback: any) => {
    this.axiosInstance.interceptors.response.use(
      res => responseInterceptor(res, callback),
      err => {
        if (err) {
          const { response, config } = err as AxiosError;
          this.apiUrl = config?.url;
          if (response) {
            const { status } = response;
            this.apiStatus = status;
          }
        }
        errorInterceptor(err, callback);
      },
    );
  };

  async request<T>(
    requestConfig: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    const session = LocalStorageUtil.getSessionInfo();
    this.apiUrl = requestConfig?.url;
    if (!this.token || this.token !== session.token) {
      this.initAuthorization();
    }
    return this.axiosInstance.request({
      ...requestConfig,
      url: `${this.baseUrl}api/${requestConfig.url}`,
    });
  }

  post<T>(url: string, data: any): Promise<HttpResponse<T>> {
    return this.request({
      method: 'POST',
      data,
      url,
    });
  }

  get<T>(url: string): Promise<HttpResponse<T>> {
    return this.request({
      method: 'GET',
      url,
    });
  }

  put<T>(url: string, data: any): Promise<HttpResponse<T>> {
    return this.request({
      method: 'PUT',
      data,
      url,
    });
  }

  delete<T>(url: string): Promise<HttpResponse<T>> {
    return this.request({
      method: 'DELETE',
      url,
    });
  }
}

export default HttpProvider.default();

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RestApi {
  get<T>(path: string): Promise<T>;
  getResponse<T>(path: string): Promise<AxiosResponse<T>>;

  post<T = void>(path: string, body?: unknown): Promise<T>;
  postResponse<T = void>(
    path: string,
    body?: unknown
  ): Promise<AxiosResponse<T>>;

  postForm<T = void>(path: string, body?: FormData): Promise<T>;
  postFormResponse<T = void>(
    path: string,
    body?: FormData
  ): Promise<AxiosResponse<T>>;

  delete(path: string): Promise<AxiosResponse>;
}

function createRequestConfig(
  baseUrl: string,
  accessToken?: string,
  baseOptions: AxiosRequestConfig = {}
): AxiosRequestConfig {
  const options = {
    ...baseOptions,
    baseURL: baseUrl,
  };
  if (accessToken) {
    return {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return options;
}

export function createRestApi(
  baseUrl: string,
  accessToken?: string,
  baseOptions: AxiosRequestConfig = {}
): RestApi {
  const requestConfig = createRequestConfig(baseUrl, accessToken, baseOptions);
  const getResponse = async <T>(path: string) =>
    await axios.get<T>(path, requestConfig);
  const postResponse = async <T = void>(path: string, body?: unknown) =>
    await axios.post<T>(path, body, requestConfig);
  const postFormResponse = async <T = void>(path: string, body?: FormData) =>
    await axios.post<T>(path, body, {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  const deleteResponse = async (path: string) =>
    await axios.delete(path, requestConfig);
  return {
    getResponse,
    postResponse,
    postFormResponse,
    get: async <T>(path: string) => {
      const response = await getResponse<T>(path);
      return response.data;
    },
    post: async <T = void>(path: string, body?: unknown) => {
      const response = await postResponse<T>(path, body);
      return response.data;
    },
    postForm: async <T = void>(path: string, body?: FormData) => {
      const response = await postFormResponse<T>(path, body);
      return response.data;
    },
    delete: deleteResponse,
  };
}

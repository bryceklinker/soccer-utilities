import axios, { AxiosRequestConfig } from 'axios';

interface RestApi {
  get<T>(path: string): Promise<T>;

  post<T = void>(path: string, body?: unknown): Promise<T>;

  postForm<T = void>(path: string, body?: FormData): Promise<T>;
}

function createRequestConfig(baseUrl: string, accessToken?: string): AxiosRequestConfig {
  return {
    baseURL: baseUrl,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined
    }
  };
}

export function createRestApi(baseUrl: string, accessToken?: string): RestApi {
  const requestConfig = createRequestConfig(baseUrl, accessToken);
  return {
    get: async <T>(path: string) => {
      const response = await axios.get<T>(path, requestConfig);
      return response.data;
    },
    post: async <T = void>(path: string, body?: unknown) => {
      const response = await axios.post<T>(path, body, requestConfig);
      return response.data;
    },
    postForm: async <T = void>(path: string, body?: FormData) => {
      const response = await axios.post<T>(path, body, {
        ...requestConfig,
        headers: {
          ...requestConfig.headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    }
  };
}

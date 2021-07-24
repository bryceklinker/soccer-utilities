declare namespace Cypress {
  interface TokenResponse {
    access_token: string;
    id_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
  }

  interface FormRequestOptions {
    form: FormData;
    method?: string;
    headers?: {
      [key: string]: string;
    };
  }

  interface Chainable {
    login(username?: string, password?: string): void;
    getToken(
      username?: string,
      password?: string
    ): Chainable<Cypress.Response<TokenResponse>>;
    form_request(url: string, options: FormRequestOptions): Promise<void>;
  }
}

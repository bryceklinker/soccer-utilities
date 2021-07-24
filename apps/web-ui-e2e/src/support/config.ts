export const CONFIG = {
  api: {
    url: Cypress.env('API_URL'),
  },
  auth: {
    domain: Cypress.env('AUTH0_DOMAIN'),
    client_id: Cypress.env('AUTH0_CLIENT_ID'),
    client_secret: Cypress.env('AUTH0_CLIENT_SECRET'),
    audience: Cypress.env('AUTH0_AUDIENCE'),
    username: Cypress.env('AUTH0_USERNAME'),
    password: Cypress.env('AUTH0_PASSWORD'),
    scope: 'openid profile',
  },
};

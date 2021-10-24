import * as jwt from 'jsonwebtoken';
import TokenResponse = Cypress.TokenResponse;
import { CONFIG } from './config';
import { JwtPayload } from 'jsonwebtoken';

Cypress.Commands.add(
  'getToken',
  (username = CONFIG.auth.username, password = CONFIG.auth.password) => {
    const { auth } = CONFIG;

    Cypress.log({
      displayName: 'Getting Token',
      message: `Retrieving token from ${auth.domain}`,
    });
    return cy.request<TokenResponse>({
      method: 'POST',
      url: `https://${auth.domain}/oauth/token`,
      body: {
        grant_type: 'password',
        username,
        password,
        audience: auth.audience,
        scope: auth.scope,
        client_id: auth.client_id,
        client_secret: auth.client_secret,
      },
    });
  }
);

Cypress.Commands.add(
  'login',
  (username = CONFIG.auth.username, password = CONFIG.auth.password) => {
    const { auth } = CONFIG;

    cy.visit('/');
    cy.getToken(username, password).then(({ body }) => {
      const claims = jwt.decode(body.id_token) as JwtPayload;
      const {
        nickname,
        name,
        picture,
        updated_at,
        email,
        email_verified,
        sub,
        exp,
      } = claims;

      const item = {
        body: {
          ...body,
          decodedToken: {
            claims,
            user: {
              nickname,
              name,
              picture,
              updated_at,
              email,
              email_verified,
              sub,
            },
            audience: auth.audience,
            client_id: auth.client_id,
          },
        },
        expiresAt: exp,
      };

      window.localStorage.setItem('auth0-cypress', JSON.stringify(item));
      cy.visit('/');
    });
  }
);

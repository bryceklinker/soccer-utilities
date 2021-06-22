import * as jwt from 'jsonwebtoken';

const DEFAULT_CREDENTIALS = {
  username: Cypress.env('AUTH0_USERNAME'),
  password: Cypress.env('AUTH0_PASSWORD')
};

Cypress.Commands.add('login', (username = DEFAULT_CREDENTIALS.username, password = DEFAULT_CREDENTIALS.password) => {
  cy.log(`Logging in as ${username}`);
  const auth_domain = Cypress.env('AUTH0_DOMAIN');
  const client_id = Cypress.env('AUTH0_CLIENT_ID');
  const client_secret = Cypress.env('AUTH0_CLIENT_SECRET');
  const audience = Cypress.env('AUTH0_AUDIENCE');
  const scope = 'openid profile';

  cy.request({
    method: 'POST',
    url: `https://${auth_domain}/oauth/token`,
    body: {
      grant_type: 'password',
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret
    }
  }).then(({ body }) => {
    const claims = jwt.decode(body.id_token) as any;
    const {
      nickname,
      name,
      picture,
      updated_at,
      email,
      email_verified,
      sub,
      exp
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
            sub
          },
          audience,
          client_id
        },
      },
      expiresAt: exp
    };

    window.localStorage.setItem('auth0-cypress', JSON.stringify(item));
  });
});

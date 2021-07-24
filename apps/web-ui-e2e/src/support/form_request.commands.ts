import FormRequestOptions = Cypress.FormRequestOptions;

Cypress.Commands.add(
  'form_request',
  (url: string, { method = 'POST', form, headers }: FormRequestOptions) => {
    return new Cypress.Promise((resolve, reject) => {
      Cypress.log({
        name: 'form_request',
        message: `[${method}] ${url}`,
      });
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = () => resolve();
      xhr.onerror = () => reject();
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.send(form);
    });
  }
);

import '@testing-library/cypress/add-commands';
import { userBuilder } from './generate';
import { saveUser } from '../../src/helpers/localStorage';

Cypress.Commands.add('createUserProgrammatically', () => {
  const user = userBuilder();
  // Registers a new user programatically
  cy.request({
    url: `${Cypress.config().baseUrl}/api/auth/signup`,
    method: 'POST',
    body: user,
  }).then((res) => {
    saveUser({ token: res.body.token, id: res.body.user._id });
    return { ...res.body.user, ...user };
  });
});

Cypress.Commands.add('createUserAndAutologin', () => {
  cy.createUserProgrammatically();
  cy.visit('/home');
});

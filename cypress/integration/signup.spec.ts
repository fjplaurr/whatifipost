import { userBuilder } from '../support/generate';

describe('Signup', () => {
  it('Should signup a new user, redirect to home and save data into localStorage', () => {
    const user = userBuilder();
    cy.visit('/');
    cy.findByLabelText(/^name$/i).type(user.name);
    cy.findByLabelText(/^surname$/i).type(user.surname);
    cy.get('#signupEmail').type(user.email);
    cy.get('#signupPassword').type(user.password);
    cy.findByRole('button', { name: /join/i }).click();
    cy.window().its('localStorage.user').should('be.a', 'string');
  });
});

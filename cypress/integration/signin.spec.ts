import { userBuilder } from '../support/generate';

describe('Signin', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should sign in with email/password and redirect to home', () => {
    cy.createUserProgrammatically().then((u) => {
      cy.get('#signinEmail').type(u.email);
      cy.get('#signinPassword').type(u.password);
      cy.findByRole('button', { name: /sign in/i }).click();
    });
  });

  it('Should show an error message when signing in a not existing user', () => {
    const user = userBuilder();
    cy.get('#signinEmail').type(user.email);
    cy.get('#signinPassword').type(user.password);
    cy.findByRole('button', { name: /sign in/i }).click();
    cy.findByText('The email and/or password are not correct').should('exist');
  });
});

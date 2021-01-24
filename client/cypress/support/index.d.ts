/// <reference types="cypress" />
// in your TS file
import { User } from '../../src/interfaces/User';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      createUserProgrammatically(): Chainable<User>;
      createUserAndAutologin(): Chainable<User>;
      assertAccesToHome(): Chainable<User>;
    }
  }
}

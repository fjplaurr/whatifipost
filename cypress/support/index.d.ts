/// <reference types="cypress" />

import { User } from '../../client/src/interfaces/User';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      createUserProgrammatically(): Chainable<User>;
      createUserAndAutologin(): Chainable<User>;
    }
  }
}

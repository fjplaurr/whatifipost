import { loadUser } from '../../client/src/helpers/localStorage';
import { postBuilder } from '../support/generate';

describe('Follow and unfollow users', () => {
  beforeEach(() => {
    cy.createUserAndAutologin();
  });

  const searchAnUserToFollow = (fullName) => {
    cy.findByLabelText(/search/i).type(fullName);
    cy.findAllByRole('button', { name: /^follow$/i }).then((results) => {
      results[0].click();
    });
  };

  it('search an user, follow it and unfollow it', () => {
    cy.createUserProgrammatically().then((user) => {
      const fullName = `${user.name} ${user.surname}`;
      searchAnUserToFollow(fullName);
      cy.findByTestId('followersSection').should('contain', fullName);
      // After clicking the unfollow button, it should disappear
      cy.findByTestId('followersSection').contains('Unfollow').click().should('not.exist');
      cy.findByTestId('followersSection').should('not.contain', fullName);
    });
  });

  it('Check you can see the posts from people you are following', () => {
    const { text } = postBuilder();
    cy.createUserProgrammatically().then((user) => {
      const fullName = `${user.name} ${user.surname}`;
      // Next request creates a post made by the followed user
      const parsedObject = loadUser();
      cy.request({
        url: `${Cypress.config().baseUrl}/api/posts/`,
        method: 'POST',
        failOnStatusCode: false,
        body: { text, author: user._id },
        headers: {
          authorization: `Bearer ${parsedObject.token}`,
        },
      });
      searchAnUserToFollow(fullName);
      // Unfollow the user and check the post they wrote it's not anymore
      cy.findByTestId('readingSection').should('contain', text);
      cy.findByTestId('followersSection').contains('Unfollow').click();
      cy.findByTestId('readingSection').should('not.contain', text);
    });
  });
});

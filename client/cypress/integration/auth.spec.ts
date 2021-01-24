describe('Auth', () => {
  it('Should get 403 response when trying to request without a valid token', () => {
    cy.request({
      url: `${Cypress.config().baseUrl}/api/users`,
      method: 'GET',
      headers: {
        authorization: 'Bearer mockTocken',
      },
      failOnStatusCode: false,
    }).should((res) => {
      expect(res.status === 403);
    });
  });

  it('Should get 401 response when trying to request without a token', () => {
    cy.request({
      url: `${Cypress.config().baseUrl}/api/users/getAll`,
      method: 'GET',
      failOnStatusCode: false,
    }).should((res) => {
      expect(res.status === 401);
    });
  });
});

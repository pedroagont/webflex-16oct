describe('Filters', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('can toggle the "Explicit" check box', () => {
    cy.get('.filters__form-group')
      .first()
      .find('input')
      .uncheck()
      .should('not.to.be.checked');
  });

  it('toggles a checkbox by clicking the label', () => {
    cy.contains('EP').click();
    cy.get('#EP').should('be.checked');
  });
});

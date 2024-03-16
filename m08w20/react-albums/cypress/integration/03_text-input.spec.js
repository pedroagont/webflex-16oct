describe('Text input', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Accepts text input', () => {
    cy.get('.search__form')
      .find('input')
      .type('muse')
      .should('have.value', 'muse');
  });
});

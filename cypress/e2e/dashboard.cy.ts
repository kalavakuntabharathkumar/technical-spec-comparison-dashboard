describe('Specification dashboard', () => {
  it('searches and displays seeded specifications', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Specification Compare');
    cy.get('#search').type('Electrical');
    cy.contains('Electrical Safety Standard');
  });
});

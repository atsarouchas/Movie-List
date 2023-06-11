describe('MovieRama basic e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders movies', () => {
    cy.get('.movie-card').should('have.length', 20);
  });

  it('fetches additional movies when scrolling to bottom', () => {
    cy.scrollTo('bottom');

    cy.wait(1000);

    cy.get('.movie-card').should('have.length', 40);
  });

  it('displays scroll to top button and when clicked, it scrolls to the top of the page', () => {
    cy.scrollTo('bottom');

    cy.wait(1000);

    cy.scrollTo('bottom');
    cy.wait(1000);

    cy.get('#scroll-to-top').should('exist');

    cy.get('#scroll-to-top').click();

    cy.window().its('scrollY').should('equal', 0);
  });

  it('searches for movies', () => {
    cy.reload();
    cy.get('#search').type('lord');

    cy.get('#loading-container').should('exist');

    cy.wait(1000);
    cy.get('.movie-card').should('have.length', 20);
  });

  it('should show message that movie was not found if the term does not give any match ', () => {
    cy.get('#search').type('ljstdasdasdskldjsasd');

    cy.wait(1000);
    cy.contains(':( We could not find a movie that matches this search').should(
      'exist'
    );
  });
});

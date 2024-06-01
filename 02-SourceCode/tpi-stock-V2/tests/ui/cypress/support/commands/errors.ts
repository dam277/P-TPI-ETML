/**
 * Check if the 401 error page is correctly displayed
 *  
 * @function cy.checkForError401
 * @example
 * // Check if the 401 error page is correctly displayed
 * cy.checkForError401();
 * 
 * @returns {Chainable<Subject>}
 * 
 */
Cypress.Commands.add(("checkForError401"), () =>
{
    cy.location('pathname').should('eq', '/401');

    // Check if the 401 error page is correctly displayed
    cy.contains('401 - Unauthorized').should('exist');
    cy.contains('You do not have the necessary permissions to access this page.').should('exist');

    // Go back to the home page
    cy.contains("Go back to home").click();
    cy.wait(1000);
    cy.location('pathname').should('eq', '/home');
});

/**
 * Check if the 403 error page is correctly displayed
 *  
 * @function cy.checkForError403
 * @example
 * // Check if the 403 error page is correctly displayed
 * cy.checkForError403();
 * 
 * @returns {Chainable<Subject>}
 * 
 */
Cypress.Commands.add(("checkForError403"), () =>
{
    cy.location('pathname').should('eq', '/403');

    // Check if the 403 error page is correctly displayed
    cy.contains('403 - Forbidden').should('exist');
    cy.contains('You are not allowed to access this page.').should('exist');

    // Go back to the home page
    cy.contains("Go back to login").click();
    cy.wait(1000);
    cy.location('pathname').should('eq', '/');
});

/**
 * Check if the 404 error page is correctly displayed
 *  
 * @function cy.checkForError404
 * @example
 * // Check if the 404 error page is correctly displayed
 * cy.checkForError404();
 * 
 * @returns {Chainable<Subject>}
 * 
 */
Cypress.Commands.add(("checkForError404"), (url: string) =>
{
    cy.location('pathname').should('eq', "/" + url);

    // Check if the 404 error page is correctly displayed
    cy.contains('404 - Not Found').should('exist');
    cy.contains('The page you are looking for does not exist.').should('exist');

    // Go back to the home page
    cy.contains("Go back to login").should('exist');
    cy.contains("Go back to home").should('exist')
});
/**
 * Login to sVn using the username and the password
 * @param username Username to login
 * @param password Password to login
 * @example
 *  // Login to sVn
 *  cy.loginSvnEvn("username", "password");
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("loginSvnEvn", (username: string, password: string) => 
{
    // Login to svn or evn
    cy.get('form').within(() => 
    {
        // Type into the fields
        // Fill the username field
        cy.get('input[id="username"]').type(username)

        // Fill the password field
        cy.get('input[id="password"]').type(password)

        // Submit the form
        cy.get("button[type='submit']").click();
    });
})
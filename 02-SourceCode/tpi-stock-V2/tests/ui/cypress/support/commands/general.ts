import * as enums from "../enums";

/**
 * Logs a message to the Cypress log
 * @param {function} originalFn Original log function
 * @param {string} title Title of the log
 * @param {LogTypes|string} logtype Type of the log
 * @param {string} message Message of the log
 */
Cypress.Commands.overwrite("log", (originalFn: Function, message: string, logtype: enums.LOGTYPES = enums.LOGTYPES.DEFAULT, title: string = null) =>
{
    // If the classic option is true, use the original log function
    if (logtype === enums.LOGTYPES.DEFAULT)
        return originalFn(message);

    // If the type is a string, use it as the title
    const logName = Object.keys(enums.LOGTYPES).find(key => enums.LOGTYPES[key] === logtype) || logtype;

    // If the title is not provided, use the default title
    if (!title)
        title = logName;
        
    // Log the message to the Cypress log
    Cypress.log({ name: `log-${logName}`, displayName: title, message: message });
});

/**
 * Logout from the website
 * 
 * @function cy.logout
 * @example 
 *  // Logout from the website
 *  cy.logout();
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("logout", () => cy.get("#btnLogout").if().click());

/**
 * Login to the website
 * 
 * @function cy.login
 * @param {string} email email to login
 * @param {string} password Password to login
 * @example
 *  // Login to the website
 *  cy.login("email", "password");
 */
Cypress.Commands.add("login", (email: string, password: string) => 
{   
    // Login to cari
    cy.get('form').within(() => 
    {
        // Type into the fields
        // Fill the email field
        cy.get('#email').clear().type(email)

        // Fill the password field
        cy.get('#password').clear().type(password)

        // Submit the form
        cy.root().submit();
    });
});
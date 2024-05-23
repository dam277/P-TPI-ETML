import * as enums from "../enums";

/**
 * Travel to the main page of cari
 * 
 * @function cy.mainPage
 * @example
 * // Go to the main page
 * cy.mainPage();
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("mainPage", () => cy.get('.app-logo').click())

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
 * Logout from cari using the logout button
 * 
 * @function cy.logout
 * @example 
 *  // Logout from cari
 *  cy.logout();
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("logout", () => cy.get(".logout").click());

/**
 * Login to cari
 * 
 * @function cy.login
 * @param {string} username Username to login
 * @param {string} password Password to login
 * @example
 *  // Login to cari
 *  cy.login("username", "password");
 */
Cypress.Commands.add("login", (username: string, password: string) => 
{   
    cy.url().should("include", "/login");

    // Login to cari
    cy.get('form').within(() => 
    {
        // Type into the fields
        // Fill the username field
        cy.get('input[formcontrolname="username"]').type(username)

        // Fill the password field
        cy.get('input[formcontrolname="password"]').type(password)

        // Submit the form
        cy.root().submit();
    });
});

/**
 * Get the field from the for attribute of a label
 * 
 * @function cy.getFieldFromForAttribute
 * @param {string} labelName Name of the label
 * @example
 *  // Get the field from the for attribute of a label
 *  cy.getFieldFromForAttribute("labelName").type("hello world");
 * 
 *  // Get the field from the for attribute of a label from a context
 *  cy.get("context").getFieldFromForAttribute("labelName").type("hello world");
 * 
 * @returns {Chainable<Subject>} The field from the for attribute of a label 
*/
Cypress.Commands.add("getFieldFromForAttribute", { prevSubject: "optional" }, ($subject: HTMLElement, labelName: string) => cy.wrap($subject).contains(labelName).invoke("attr", "for").then(value => cy.get(`#${value}`)));

/**
 * Select an option from a selctor
 * 
 * @function cy.select
 * @param {string | number | Array<string | number>} value Value to select
 * @param {Partial<{ custom: boolean }>} options Options to pass to the function
 * @example
 * // Select an option from a selector
 * cy.get("selector").select("value");
 * 
 * // Select an option from a selector with custom options
 * cy.get("selector").select("value", { custom: true });
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.overwrite("select", (originalFn: Function, $subject: HTMLElement, value: string | number | (string | number)[], options = {}) =>
{
    // Get the options
    const { custom } = options;

    // Check if the select is a custom one
    if (!options || !custom)
        return originalFn($subject, value, options);

    // Select the element in custom selector
    cy.wrap($subject).click().as("actualElement");
    cy.get("div[role='listbox']").contains(value.toString()).click();
    cy.get("@actualElement");
});
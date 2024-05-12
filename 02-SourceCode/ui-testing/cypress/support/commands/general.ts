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

/**
 * Get the toggle button from a parent text
 * 
 * @function cy.toggleSwitch
 * @param {string} name Name of the label
 * @param {Partial<{ toggle: TOGGLE, className: string }>} options Options to pass to the function
 * @example
 *  // Get the toggle button from a parent text
 *  cy.toggleSwitch("name"); // Toggle ON or OFF the switch
 * 
 *  // Get the toggle button from a parent text from a context
 *  cy.get("context").toggleSwitch("name"); // Toggle ON or OFF the switch
 * 
 *  // Get the toggle button from a parent text with options
 *  cy.toggleSwitch("name", { toggle: TOGGLE.ON, className: "className" }); // Toggle ON the switch if possible
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("toggleSwitch", { prevSubject: "optional" }, ($subject, name, options: Partial<{ toggle: enums.TOGGLE, className: string }> = {}) => 
{   
    // Get the options
    const { toggle, className = "mdc-switch--checked" } = options;

    // Get the button and check if the toggle is checked
    cy.wrap($subject).contains(name).children("mat-slide-toggle").children().children("button").then(($button) =>
    {
        // Get the classlist and check if one of these has the checked word
        const classes = $button[0].classList;
        
        // Check if the toggle button is checked
        let isAlreadyChecked = false;
        for (let classProperty of Array.from(classes)) 
        {
            // Check if the classProperty is checked one
            if (classProperty !== className) continue;
            isAlreadyChecked = true;
            break;
        }

        // Check if the toggle in to on or off
        switch(toggle)
        {
            case enums.TOGGLE.ON: 
                if (!isAlreadyChecked) 
                    cy.wrap($button).click();
                break;
            case enums.TOGGLE.OFF:
                if (isAlreadyChecked) 
                    cy.wrap($button).click();
                break;
            default:
                cy.wrap($button).click();
                break;
        }
    });
});
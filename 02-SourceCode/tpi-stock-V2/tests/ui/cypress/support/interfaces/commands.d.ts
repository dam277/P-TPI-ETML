/// <reference types="cypress" />

declare namespace Cypress 
{
    interface Chainable<Subject>
    {
        // ------------------------------- Base functions -------------------------------
        type(text: string|number, options?: Partial<TypeOptions>): Chainable<Subject>;

        //------------------------------- General functions -------------------------------
        /**
        * Travel to the main page of cari
        * 
        * @function cy.mainPage
        * @example
        *  // Go to the main page
        *  cy.mainPage();
        * 
        * @returns {Chainable<Subject>}
        */
        mainPage(): Chainable<Subject>;
        
        /**
        * @function cy.log
        * @override
        * @param {string} message Message to log
        * @param {Partial<string>} type Type of the log
        * @param {Partial<string>} title Title of the log
        * @example
        *  // Log a classic message
        *  cy.log("message");
        *  // Log a message with a type
        *  cy.log("message", string.INFO);
        *  // Log a message with a type and a title
        *  cy.log("message", string.INFO, "title");
        */
        log(message: string, type?: Partial<string>, title?: Partial<string>): Chainable<Subject>;
        
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
        logout(): Chainable<Subject>;
        
        /**
        * Login to cari
        * 
        * @function cy.login
        * @param {String} username Username to login
        * @param {String} password Password to login
        * @example
        *  // Login to cari
        *  cy.login("username", "password");
        * 
        * @returns {Chainable<Subject>}
        */
        login(username: string, password: string): Chainable<Subject>;
        
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
        getFieldFromForAttribute(labelName: string): Chainable<Subject>;
        
        /**
        * Select an option from a selctor
        * 
        * @function cy.select
        * @override
        * @param {string | number | Array<string | number>} value Value to select
        * @param {Partial<{ custom: boolean }>} options Options to pass to the function
        * @example
        *  // Select an option from a selector
        *  cy.get("selector").select("value");
        * 
        *  // Select an option from a selector with custom options
        *  cy.get("selector").select("value", { custom: true });
        * 
        * @returns {Chainable<Subject>}
        */
        select(value: string | number | Array<string | number>, options?: Partial<{custom: boolean}>): Chainable<Subject>;        
        
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
        *  import { TOGGLE } from "../support/enums";
        *  cy.toggleSwitch("name", { toggle: TOGGLE.ON, className: "className" }); // Toggle ON the switch if possible
        * 
        * @returns {Chainable<Subject>}
        */
        toggleSwitch(name: string, options?: Partial<{ toggle: number, className: string }>): Chainable<Subject>;
    }
}
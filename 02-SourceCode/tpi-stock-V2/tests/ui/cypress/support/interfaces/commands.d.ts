/// <reference types="cypress" />

declare namespace Cypress
{
    interface Chainable<Subject>
    {
        // ------------------------------- Base functions -------------------------------
        type(text: string|number, options?: Partial<TypeOptions>): Chainable<Subject>;

        //------------------------------- General functions -------------------------------
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
        
        //------------------------------- Checks functions -------------------------------
        /**
         * Check if the home page is correctly displayed
         *  
         * @function cy.checkHomePage
         * @example
         * // Check if the home page is correctly displayed
         * cy.checkHomePage(user, shop);
         * 
         * @param {{}} user User to check
         * @param {{}} shop Shop to check
         * @returns {Chainable<Subject>}
         * 
         */
        checkHomePage(user: {}, shop: {}): Chainable<Subject>;

        /**
         * Check if the dashboard page is correctly displayed
         *  
         * @function cy.checkDashboardPage
         * @example
         * // Check if the dashboard page is correctly displayed
         * cy.checkDashboardPage(user, shop);
         * 
         * @param {{}} user User to check
         * @param {{}} shop Shop to check
         * @param {[]} shops Shops to check
         * @returns {Chainable<Subject>}
         * 
         */
        checkDashboardPage(user: {}, shop: {}, shops: any[]): Chainable<Subject>;

        /**
         * Check if the values of the array are correctly displayed
         *  
         * @function cy.checkOrderPage
         * @example
         * // Check if the values of the array are correctly displayed
         * cy.checkOrderPage(user, shop);
         * 
         * @param {{}} user User to check
         * @param {[]} shops Shops to check
         * @returns {Chainable<Subject>}
         * 
         */
        checkArrayValues(user: {}, shops: any[]): Chainable<Subject>;

        //------------------------------- Error functions -------------------------------
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
        checkForError401(): Chainable<Subject>;

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
        checkForError403(): Chainable<Subject>;

        /**
         * Check if the 404 error page is correctly displayed
         *  
         * @function cy.checkForError404
         * @example
         * // Check if the 404 error page is correctly displayed
         * cy.checkForError404();
         * 
         * @param {string} url URL to check
         * @returns {Chainable<Subject>}
         * 
         */
        checkForError404(url: string): Chainable<Subject>;
    }
}
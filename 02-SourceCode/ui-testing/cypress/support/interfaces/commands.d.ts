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
        
        //------------------------------- Cari functions -------------------------------
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
        * Search for fields in cari
        * 
        * @function cy.search
        * @param {Object<String, String>} fields Fields to search
        * @example
        *  // Search for a field in cari
        *  cy.search({ "field": "value" });
        * 
        *  // Search for a field in cari from the enum
        *  import { FIELDS } from "../support/enums";
        *  cy.search({[FIELDS.surname]: "surname",[FIELDS.name]: "name"})
        * 
        * @returns {Chainable<Subject>}
        */
        search(fields: { [key: string]: string }): Chainable<Subject>;
        
        /**
        * Change the language of cari
        * @param language Language to change to
        * @example
        *  // Change the language of cari
        *  cy.changeCariLanguage("language");
        * 
        *  // Change the language of cari from the enum
        *  import { LANGUAGE } from "../support/enums";
        *  cy.changeCariLanguage(LANGUAGE.fr);
        * 
        * @returns {Chainable<Subject>}
        */
        changeCariLanguage(language: string): Chainable<Subject>;
        
        //------------------------------- eCari functions -------------------------------
        /**
        * Login to eCari vehicle expertise using the convocation number and the matricule number
        * 
        * @function cy.login
        * @param {number|string} convocationNumber Convocation number to login
        * @param {number|string} matriculeNumber Matricule number to login
        * @example
        *  // Login to cari using the convocation number and the matricule number
        *  cy.login(31311, 6311414);
        * 
        * @returns {Chainable<Subject>}
        */
        loginVehicleExpertise(convocationNumber: number|string, matriculeNumber: number|string): Chainable<Subject>;
        
        /**
        * Login to eCari private volunteer using the name, holder number and the matricule number
        * @param name Name of the private volunteer
        * @param holderNumber Holder number of the private volunteer
        * @param matriculeNumber Matricule number of the private volunteer
        * @example
        *  // Login to cari using the name, holder number and the matricule number
        *  cy.loginPrivateVolunteer("name", 31311, 555244010);
        * 
        * @returns {Chainable<Subject>}
        */
        loginPrivateVolunteer(name: string, holderNumber: number, matriculeNumber: number): Chainable<Subject>;
        
        /**
        * Get the meeting from the matricule number
        * @param {Partial<number>} matriculeNumber Matricule number of the meeting
        * @example
        *  // Get the meeting from the matricule number
        *  cy.getMeeting(555244010);
        * 
        * @returns {Chainable<Subject>}
        */
        getMeeting(matriculeNumber?: Partial<number>): Chainable<Subject>;
        
        /**
        * Check if the meeting exists from the matricule number
        * @param {Partial<number>} matriculeNumber Matricule number of the meeting
        * @param {Partial<boolean>} shouldExists Should the meeting exists
        * @example
        *  // Check if the meeting exists from the matricule number
        *  cy.checkIfMeetingExists(555244010, true);
        * 
        * @returns {Chainable<Subject>}
        */
        checkIfMeetingExists(matriculeNumber: number, shouldExists?: Partial<boolean>): Chainable<Subject>;
        
        /**
        * Select the calendar date from the meeting
        * @param {string} day Day of the meeting
        * @param {Partial<{ useCalendar: boolean, hour: string, moves: number }>} options Options to pass to the function
        * @example
        *  // Get the meeting from the matricule number
        *  cy.getMeeting(555244010);
        *  // Get the meeting from the matricule number with options
        *  cy.getMeeting(555244010, { hour: "12:00", moves: 3 });
        *  // Get the meeting from the matricule number with options
        *  cy.getMeeting(555244010, { useCalendar: true, hour: "12:00", moves: 1, dayNumber: 1 });
        * 
        * @returns {Chainable<Subject>}
        */
        selectCalendarDate(day: string, pageSelection: number, options?: Partial<{ useCalendar: boolean, hour: string, moves: number }>): Chainable<Subject>;
        
        // ------------------------------- sVn and eVn functions -------------------------------
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
        loginSvnEvn(username: string, password: string): Chainable<Subject>;
    }
}
// Cari commands for cypress
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
 *  cy.search({[FIELDS.SURNAME]: "surname",[FIELDS.NAME]: "name"})
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("search", (fields: { [key: string]: string }) => 
{
    // Get the search form and fill the fields
    cy.get('.search-form').within(() => 
    {
        // Loop through the fields
        Object.keys(fields).forEach((key) =>
        {
            // Fill the field and submit the form
            cy.get(`input[formcontrolname="${key}"]`).type(fields[key]);
            cy.root().submit();
        });
    });
});

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
Cypress.Commands.add("changeCariLanguage", (language: enums.LANGUAGES) => 
{
    cy.get('.header-menus > .profil-button > .mat-mdc-button-touch-target').click();

    // Change the language to the wanted language if the button is accessible
    cy.get(':nth-child(5) > div').find("button").each(($btn) => 
    {
        // Set to true when button found
        let buttonFound = false;        

        // Check if the button is able
        if (!$btn.prop("disabled"))
        {
            // Check which language wanted and check if the button is found
            switch (language) 
            {
                case enums.LANGUAGES.FR.toUpperCase():
                    buttonFound = $btn.text().includes("Französisch" || "Francese" || "Franzos");
                    break;
                case enums.LANGUAGES.DE.toUpperCase():
                    buttonFound = $btn.text().includes("Allemand" || "Tedesco" || "Tudestg");
                    break;
                case enums.LANGUAGES.IT.toUpperCase():
                    buttonFound = $btn.text().includes("Italien" || "Italienisch" || "Talian");
                    break;
                case enums.LANGUAGES.RO.toUpperCase():
                    buttonFound = $btn.text().includes("Romanche" || "Rätoromanisch" || "Romanche");
                    break;
                default:
                    break;
            }
      
            // If the button has been found, click on it
            if (buttonFound)
                cy.wrap($btn).click();
            else
            {
                cy.get('app-header-menus-configuration-popup.ng-star-inserted > :nth-child(3)').find("button").eq(0).click();
                cy.mainPage();
            }
        }
    })
});














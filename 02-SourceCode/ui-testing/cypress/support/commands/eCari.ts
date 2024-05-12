import * as enums from "../enums";
import { Random } from "../functions";

// Commands for eCari

/**
 * Login to eCari vehicle expertise using the convocation number and the matricule number
 * 
 * @function cy.loginVehicleExpertise
 * @param {number|string} convocationNumber Convocation number to login
 * @param {number|string} matriculeNumber Matricule number to login
 * @example
 *  // Login to cari using the convocation number and the matricule number
 *  cy.loginVehicleExpertise(31311, 6311414);
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("loginVehicleExpertise", (NConvocation: number|string, NMatricule: number|string) => 
{
    cy.get('form.ng-untouched').within(() => 
    {
        cy.get("#noConvocation").type(NConvocation.toString());
        cy.get("#noMatricule").type(NMatricule.toString());
    });
    cy.get("button[type='submit']").click();
});

/*****************************************************************************************************************************************
 * Login to cari with the name and the password
 * @function cy.login => Login to cari
 * @param {string} username => Username to login
 * @param {string} password => Password of the user
 */
Cypress.Commands.add("loginPrivateVolunteer", (name: string, holderNumber: number, matriculeNumber: number) => 
{
    cy.url().should("include", "/login");

    // Login to cari
    cy.get('form').within(() => 
    {
        // Type into the fields
        // Fill the name field
        cy.get('input[formcontrolname="name"]').type(name)

        // Fill the holder number field
        cy.get('input[formcontrolname="noDetenteur"]').type(holderNumber.toString())

        // Fill the matricule number field
        cy.get('[formcontrolname="noMatricule"]').children().type(matriculeNumber.toString())

        // Submit the form
        cy.root().submit();
    });
});

/**
 * Get the meeting from the matricule number
 * @param {Partial<number>} matriculeNumber Matricule number of the meeting
 * @example
 *  // Get the meeting from the matricule number
 *  cy.getMeeting(555244010);
 * 
 * @returns {Chainable<Subject>}
 */
Cypress.Commands.add("getMeeting", (matriculeNumber: Partial<number> = undefined) => 
{
    // Get the meeting in the table view
    if (matriculeNumber !== undefined)
        cy.get('dw-rendez-vous-list > .table > tbody').contains(matriculeNumber).parentsUntil("tr");
    // Get all the meetings in the table view
    else
        cy.get('dw-rendez-vous-list > .table > tbody').contains("tr");
});

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
Cypress.Commands.add("checkIfMeetingExists", (matriculeNumber: number, shouldExists: Partial<boolean>) => 
{
    cy.get('dw-rendez-vous-list > .table > tbody').then(($tbody) => 
    {
        if (shouldExists)
            expect($tbody).to.contain(matriculeNumber);
        else
            expect($tbody).to.not.contain(matriculeNumber);
    });
});

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
Cypress.Commands.add("selectCalendarDate", (day: string, pageSelection: enums.CALENDAR, options: Partial<{ useCalendar: boolean, hour: string, moves: number }>) => 
{
    // Wait for the page to load
    cy.wait(20000);

    // Get the options
    const { useCalendar, hour, moves = 1 } = options;

    // Get the calendar button to chose the date
    if (useCalendar) 
    {
        // Get the calendar button to chose the date
        cy.get("#middle").find("button").click();

        // Select week pageSelection
        selectWeek(() => 
        {
            cy.wait(2000);

            if (pageSelection === enums.CALENDAR.NEXT)               
                cy.get('.p-datepicker-next-icon').click(); // Go to the next week
            else if (pageSelection === enums.CALENDAR.PREVIOUS) 
                cy.get('.p-datepicker-prev-icon').click(); // Go to the previous week
        });
        
        // Click on the day number in the calendar
        let random = Random(5);
        if (random < 1) random++;

        cy.get(".p-datepicker-calendar > tbody > tr").eq(random).children("td").eq(2).click();
    }
    else
    {
        // Switch week pageSelection
        selectWeek(() => 
        {
            cy.wait(20000);
            
            // Go to the next or previous week
            cy.get(`#${pageSelection}`).find("button").click();
        });
    }

    cy.wait(30000);
    
    // Get the day and hour and click the button
    cy.contains(day).parent().find(`#listeHeuresApresMidi`).find("button").find(hour).click();
    cy.get('dw-date-time-confirmation > dw-modal > .modal > .modal-dialog > .modal-content > .modal-body > .dispoButtons > :nth-child(1)').click();

    cy.wait(10000);

    /**
     * Select the week on the calendar
     * @param {function} fn Function to execute
     */
    function selectWeek(fn: Function)
    {
        // Switch week selection
        for (let i = 0; i < moves; i++) 
            fn();
    }
});

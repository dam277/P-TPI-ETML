// import * as enums from "../support/enums";
// import { Logger } from "../support/utils/Logger";
// import { GenererNumeroMatricule } from "cypress/support/functions";

describe('test 1', () => 
{ 
    it('tests', () => 
    {
        // // Database simple exec
        // cy.task("queryDb", {query: "SELECT * FROM world.city"}).then((data) => {
        //     console.log(data);
        // });

        // // Database bind exec
        // cy.task("queryDb", {query: "SELECT * FROM world.city WHERE District = ?", values: ["Noord-Holland"], simpleExec: false}).then((data) => {
        //     console.log(data);
        // });

        // // Normal logs 
        // cy.log("Normal log");

        // // Personalised logs
        // cy.log("Default log", enums.LOGTYPES.DEFAULT);
        // cy.log("Info log", enums.LOGTYPES.INFO);
        // cy.log("Warning log", enums.LOGTYPES.WARNING);
        // cy.log("Error log", enums.LOGTYPES.ERROR);
        // cy.log("Success log", enums.LOGTYPES.SUCCESS);

        // // Personalised logs with title
        // cy.log("logging error", enums.LOGTYPES.ERROR, "Title of errror log");

        // // Create a custom log style
        // Logger.createCustomLog("CUSTOM", "#FFFF19");
        // cy.log("Custom log", "CUSTOM");

        // // Personalised logs with logger itself using log file
        // const logger = new Logger(__filename);
        // logger.log("Default log", enums.LOGTYPES.DEFAULT);
        // logger.log("Info log", enums.LOGTYPES.INFO);
        // logger.log("Warning log", enums.LOGTYPES.WARNING);
        // logger.log("Error log", enums.LOGTYPES.ERROR);
        // logger.log("Successfully created log file", enums.LOGTYPES.SUCCESS);

        // // The script's language is set to TypeScript so we can see the hint with the types of the params when passing the mouse in the function
        // // cy.getFieldFromForAttribute: Cypress.Chainable<undefined>
        // // The function is working as well
        // cy.getFieldFromForAttribute("username").type("admin");


        // // Calling the function which generate matricule numbers
        // let matriculeNumber = GenererNumeroMatricule('23489740', 2)

        // // Using the result of the function
        // matriculeNumber.forEach(element => console.log(element))
        // console.log(matriculeNumber[0])
    });
})

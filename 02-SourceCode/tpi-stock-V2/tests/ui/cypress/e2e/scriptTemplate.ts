/************************************
 * 
 * ---
 * @author Damien Loup
 * @description :
 *  - 
 *  -
*************************************/

// Import functons that we need to code
import { Random, RandomText } from "../support/functions";
import * as enums from "../support/enums";

// Import interfaces
import IUser from "cypress/support/interfaces/IUser";
import IShop from "cypress/support/interfaces/IShop";

describe(("Login multiple users and check for his rights are correct"), () =>
{
    let users: IUser[];     // All datas of the json file

    before("Get the datas before all tests", () =>
    {
        // Get the users from the json file
        cy.fixture("users").then((datas) => users = datas);
    });

    beforeEach("Go on the website before every tests", () =>
    {
        // Get the url and redirect
        cy.visit("/");

        // Login to the user
        // cy.login("", "");
    });

    describe((""), () =>
    {
        beforeEach("Visit the ", () => 
        {   
            // Login to the user
            // cy.login("", "");
        });

        it("", () => 
        {
           
        });
    });


    after("", () =>
    {
      
    });

    afterEach("", () =>
    {
      
    });
});
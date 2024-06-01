/************************************
 * Import excel file and check if the datas are correctly displayed
 * ---
 * @author Damien Loup
 * @description :
 *  - Check if the user can import an excel file and check if the datas are correctly displayed
*************************************/

// Import functons that we need to code
import { Random, RandomText } from "../support/functions";
import * as enums from "../support/enums";

// Import interfaces
import IUser from "cypress/support/interfaces/IUser";
import IShop from "cypress/support/interfaces/IShop";

describe(("Login multiple users and check for his rights are correct"), () =>
{
    let users: IUser[], shops: IShop[];     // All datas of the json file
    let user: IUser, shop: IShop            // User that we will be used

    before("Get the datas before all tests", () =>
    {
        // Get the users and shops from the json files
        cy.fixture("users").then((datas) => users = datas);
        cy.fixture("shops").then((datas) => shops = datas);
    });

    beforeEach("Go on the website before every tests", () =>
    {
        // Get the url and redirect
        cy.visit("/");
    });

    describe(("login to a manager user, get the actual stored units, import a stock, check again the new values"), () =>
    {
        let units: any[] = [], unitsToAdd: any[] = [];                     // All the units that we will get from the database

        beforeEach('Login the user before all the tests', () => 
        {   
            // Get the user and the shop
            user = users.filter((user) => !user.boss)[0]; 
            shop = shops.filter((shop) => shop.name === user.shop)[0];

            // Login to the user
            cy.login(user.email, user.password);
        });

        it("Get the actual stored units", () =>
        {
            // Get the page content and navigate to the dashboard page
            cy.get('main > aside').next().as('pageContent');
            cy.get("a").contains("Dashboard").click();
            cy.wait(1000);

            // Get the datas from the excel file
            cy.task("convertExcelToJson", {filePath: __dirname + "/../data/stock.xlsm"}).then((data: any) =>
            {
                // Get the datas from the excel file except the first row
                const excelData: [] = data.Feuil1.slice(1);
                
                // Get the datas to add and set the array
                unitsToAdd = excelData.map((unit: any, index: number) => ({articleId: `A-${index+1}`, unitsStored: unit.G}))                
            });

            // Get the stored units
            cy.get('@pageContent').find('table').each(($table) =>
            {   
                // Check if the table has children
                const hasChildren = $table.find('tbody').children().length > 0;

                // Check if the title of the table contains "Stock"
                if($table.prev().text().includes("Stock") && hasChildren)
                {
                    // Get all the rows of the table
                    cy.wrap($table).find('tbody').children().each(($row) =>
                    {
                        // Get the article id and the units stored
                        let articleId = $row.find('td').eq(0).text();
                        let unitsStored = parseInt($row.find('td').eq(7).text());
                        
                        // Push the datas in the array
                        units.push({articleId: articleId, unitsStored: unitsStored});
                    });
                }
            });
        });

        it("Import a stock with an excel file", () => 
        {
            // Navigate to the dashboard page
            cy.get("a").contains("Dashboard").click();
            cy.wait(1000);

            // Import the file with the input
            cy.get('#importFileInput').selectFile(__dirname + "/../data/stock.xlsm", {force: true});
            cy.wait(5000);
        });

        it("Check if the datas are correctly displayed with the new values", () => 
        {
            // Get the page content and navigate to the dashboard page
            cy.get('main > aside').next().as('pageContent');
            cy.get("a").contains("Dashboard").click();
            cy.wait(1000);

            // Get the stored units
            cy.get('@pageContent').find('table').each(($table) =>
            {   
                // Check if the title of the table contains "Stock"
                if($table.prev().text().includes("Stock"))
                {
                    // Get all the rows of the table
                    cy.wrap($table).find('tbody').children().each(($row) =>
                    {
                        // Get the article id and the units stored
                        let articleId = $row.find('td').eq(0).text();
                        let unitsStored = parseInt($row.find('td').eq(7).text());

                        // Get the article from the array
                        let article = units.filter((unit) => unit.articleId === articleId)[0];
                        let articleToAdd = unitsToAdd.filter((unit) => unit.articleId === articleId)[0];

                        // Make the sum of the units stored
                        const unitsStoredTotal = (article?.unitsStored ? article.unitsStored : 0) + articleToAdd.unitsStored;

                        // Check if the units stored are the same
                        expect(unitsStored).to.eq(unitsStoredTotal);                       
                    });
                };
            });
        });
    });

    describe(("login to a manager user, get the actual stored units, import an order, accept and refuse with a boss and check again the new values"), () =>
    {
        let units: any[] = [], unitsToAdd: any[] = [];                     // All the units that we will get from the database

        beforeEach('Login the user before all the tests', () => 
        {   
            // Get the user and the shop
            user = users.filter((user) => !user.boss)[0]; 
            shop = shops.filter((shop) => shop.name === user.shop)[0];
        });

        it("Get the actual stored units", () =>
        {
            // Login to the user
            cy.login(user.email, user.password);

            // Get the page content and navigate to the dashboard page
            cy.get('main > aside').next().as('pageContent');
            cy.get("a").contains("Dashboard").click();
            cy.wait(1000);

            // Get the stored units
            cy.get('@pageContent').find('table').each(($table) =>
            {   
                // Check if the table has children
                const hasChildren = $table.find('tbody').children().length > 0;

                // Check if the title of the table contains "Stock"
                if($table.prev().text().includes("Stock") && hasChildren)
                {
                    // Get all the rows of the table
                    cy.wrap($table).find('tbody').children().each(($row) =>
                    {
                        // Get the article id and the units stored
                        let articleId = $row.find('td').eq(0).text();
                        let unitsStored = parseInt($row.find('td').eq(7).text());
                        
                        // Push the datas in the array
                        units.push({articleId: articleId, unitsStored: unitsStored});
                    });
                }
            });
        });

        it("Import orders excel file", () => 
        {
            // Login to the user
            cy.login(user.email, user.password);
            
            // Navigate to the dashboard page
            cy.get("a").contains("Dashboard").click();
            cy.wait(1000);

            // Import the file with the input
            cy.get('#importFileInput').selectFile(__dirname + "/../data/order.xlsm", {force: true});
            cy.wait(5000);
        });

        it("Login as a boss and accept or refuse the orders", () =>
        {
            // Get the user and the shop
            user = users.filter((user) => user.boss)[0]; 

            // Login to the user
            cy.login(user.email, user.password);

            // Go to the orders page
            cy.get("a").contains("Orders").click();
            cy.wait(1000);

            // Get the table of the orders
            cy.get('main > aside').next().as('pageContent');
            cy.get('@pageContent').find('table').each(($table) =>
            {
                // Check if the title of the table contains the name of the shop
                if($table.prev().text().includes(shop.name))
                {
                    // Get all the rows of the table
                    cy.wrap($table).find('tbody').children().each(($row, index) =>
                    {
                        // Get the datas of the row
                        let articleId = $row.find('td').eq(1).text();
                        let unitsOrdered = parseInt($row.find('td').eq(2).text());
                        let status = $row.find('td').eq(5).text();
                        
                        // Check if the status is "Pending"
                        if(status.toLowerCase() === "pending")
                        {
                            if(index % 2 === 1)
                            {
                                // Refuse the first order it finds
                                cy.wrap($row).find('td').eq(4).find('button').if('visible').eq(1).click();
                                cy.wrap($row).find('td').eq(5).should('have.text', 'Rejected');
                            }
                            else
                            {
                                // Accept the first order it finds
                                cy.wrap($row).find('td').eq(4).find('button').if('visible').eq(0).click();     
                                cy.wrap($row).find('td').eq(5).should('have.text', 'Approved');

                                // Push the datas in the array
                                unitsToAdd.push({articleId: articleId, unitsOrdered: unitsOrdered});
                            }
                        }
                    });
                }
            });
        });

        it("Check if the datas are correctly displayed with the new values", () => 
        {
            // Login to the user
            cy.login(user.email, user.password);

            // Get the page content and navigate to the dashboard page
            cy.get('main > aside').next().as('pageContent');
            cy.get("a").contains("Dashboard").click();
            cy.wait(1000);

            // Get the stored units
            cy.get('@pageContent').find('table').each(($table) =>
            {   
                // Check if the title of the table contains "Stock"
                if($table.prev().text().includes("Stock"))
                {
                    // Get all the rows of the table
                    cy.wrap($table).find('tbody').children().each(($row) =>
                    {
                        // Get the article id and the units stored
                        let articleId = $row.find('td').eq(0).text();
                        let unitsStored = parseInt($row.find('td').eq(7).text());

                        // Get the article from the array
                        let article = units.filter((unit) => unit.articleId === articleId)[0];
                        let articleToAdd = unitsToAdd.filter((unit) => unit.articleId === articleId)[0] || {unitsOrdered: 0};

                        // Make the sum of the units stored
                        const unitsStoredTotal = (article?.unitsStored ? article.unitsStored : 0) + articleToAdd.unitsOrdered;
                        
                        // Check if the units stored are the same
                        expect(unitsStored).to.eq(unitsStoredTotal);
                    });
                };
            });
        });
    });
});
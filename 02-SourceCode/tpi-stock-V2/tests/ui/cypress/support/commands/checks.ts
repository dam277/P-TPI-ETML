// Import interfaces
import IShop from "../interfaces/IShop";
import IUser from "../interfaces/IUser";

/**
 * Check if the home page is correctly displayed
 *  
 * @function cy.checkHomePage
 * @example
 * // Check if the home page is correctly displayed
 * cy.checkHomePage(user, shop);
 * 
 * @param {IUser} user User to check
 * @param {IShop} shop Shop to check
 * @returns {Chainable<Subject>}
 * 
 */
Cypress.Commands.add("checkHomePage", (user: IUser, shop: IShop) => 
{
    // Get the main content of the page
    cy.get('main > aside').next().as('pageContent');

    // Check if the user name is on the sidebar
    cy.get("#userProfile").should('contain', user.name);

    // Check if the home page text is on the page
    cy.get('@pageContent').should('contain', `You actually are in the shop stock ${!user.boss ? `${user.shop} in ${shop.city}` : ""}`);
    cy.contains(user.boss ? 'All of the stocks and orders are displayed separately on dashboard and orders pages' : 'All of the stocks and orders are displayed on your dashboard').should('exist');
    cy.contains('You can order articles by importing “order excel file” and only the master of the website can approve it.').should(user.boss ? 'not.exist' : 'exist');
    cy.contains('You can also add articles to your stock by importing “stock excel file”').should(user.boss ? 'not.exist' : 'exist');

    // Check if the name of the user and the shop are on the page
    cy.get('@pageContent').should('contain', user.name);
    cy.get('#shop').should(user.boss ? 'not.exist' : 'exist');
});

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
 * @returns {Chainable<Subject>}
 * 
 */
Cypress.Commands.add("checkDashboardPage", (user: IUser, shop: IShop, shops: IShop[]) =>
{
    // Get the main content of the page
    cy.get('main > aside').next().as('pageContent');

    // Check if the user name is on the sidebar
    cy.checkArrayValues(user, shops);
    
    // Check the dashboard page content
    cy.get('#importFileInput').should(user.boss ? 'not.exist' : 'exist').if().parent().should('contain', 'Import stock');
    if(!user.boss) 
        cy.contains(shop.name).should('exist');
});

/**
 * Check if the values of the array are correctly displayed
 *  
 * @function cy.checkOrderPage
 * @example
 * // Check if the values of the array are correctly displayed
 * cy.checkOrderPage(user, shop);
 * 
 * @param {{}} user User to check
 * @param {{}} shop Shop to check
 * @returns {Chainable<Subject>}
 * 
 */
Cypress.Commands.add("checkArrayValues", (user: IUser, shops: IShop[]) => 
{   
    // Get the tables as a list
    cy.get('@pageContent').find('table').then(($tables) =>
    {
        let unitsSolded = 0, unitsStored = 0, unitsOrdered = 0;             // Units solded, stored and ordered

        // Get all the tables
        cy.wrap($tables).each(($table) =>
        {
            // Check if the table has children
            const hasChildren = $table.find('tbody').children().length > 0;
            
            // Check if the table is the stock table
            if ($table.prev().text().includes("Stock") && hasChildren)
            {
                // Get the items solded
                cy.wrap($table).find('tbody').children().each(($row) => 
                {
                    unitsSolded += parseInt($row.children().eq(6).text());
                    unitsStored += parseInt($row.children().eq(7).text());
                });
            }
            else if ($table.prev().text().includes("Orders") && hasChildren)
            {
                // Get the items ordered
                cy.wrap($table).find('tbody').children().each(($row) => 
                {
                    if($row.children().eq(4).text().toLowerCase() === "pending")
                        unitsOrdered += parseInt($row.children().eq(2).text());
                });
            }
        }).then(() => 
        {
            cy.get('#inventorySummary').find('div').then(($inventorySummary) =>
            {
                // Get the path of the page
                cy.location('pathname').then((path) => 
                {
                    // Check the values of the inventory summary
                    if(path.includes('dashboard'))
                    {
                        cy.wrap($inventorySummary).contains('Items sold').next().invoke('text').should('equal', unitsSolded.toString());
                        cy.wrap($inventorySummary).contains('Items in stock').next().invoke('text').should('equal', unitsStored.toString());

                        // Only if the user is not the boss
                        if(!user.boss)
                            cy.wrap($inventorySummary).contains('Items in order').next().invoke('text').should('equal', unitsOrdered.toString());
                    }
                    else if(path.includes('orders'))
                        cy.wrap($inventorySummary).contains('Items in order').next().invoke('text').should('equal', unitsOrdered.toString());
                });
            });
        });
    });
});
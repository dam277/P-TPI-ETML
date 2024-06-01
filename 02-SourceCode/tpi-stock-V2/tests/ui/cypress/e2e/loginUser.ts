/************************************
 * Login multiple users and check for his rights are correct
 * ---
 * @author Damien Loup
 * @description :
 *  - Check if the user can login and go on multiple pages that he has rights and not
*************************************/

// Import functons that we need to code
import { Random, RandomText } from '../support/functions';
import * as enums from '../support/enums';

// Import interfaces
import IUser from 'cypress/support/interfaces/IUser';
import IShop from 'cypress/support/interfaces/IShop';

describe(('Login multiple users and check for his rights are correct'), () =>
{
    let users: IUser[], shops: IShop[];     // All datas of the json file
    let user: IUser, shop: IShop            // User that we will be used

    before('Get the datas before all tests', () =>
    {
        // Get the users from the json file
        cy.fixture('users').then((datas) => users = datas);
        cy.fixture('shops').then((datas) => shops = datas);
    });

    beforeEach('Go on the website before every tests', () =>
    {
        // Go to the website from the base url set
        cy.visit("/");
    });

    describe(('Login with a manager user and make him go on multiple pages that he has rights and not'), () =>
    {
        beforeEach('Login the user before all the tests', () => 
        {   
            // Get the user and the shop
            user = users.filter((user) => !user.boss)[0]; 
            shop = shops.filter((shop) => shop.name === user.shop)[0];

            // Login to the user
            cy.login(user.email, user.password);
        });

        it('Check the home page text, user and shop name', () => 
        {
            // Check if the home page is correctly displayed
            cy.checkHomePage(user, shop);
        });

        it('Check the user dashboard page, and check the content', () =>
        {
            // Go to the dashboard page
            cy.get('a').contains('Dashboard').click();
            cy.wait(5000);

            cy.checkDashboardPage(user, shop, shops);
        });

        it('Check if the user can go to the orders page', () =>
        {
            cy.get('a').contains('Orders').should("not.exist")
        });

        it('Try to trigger all the error pages that the user can have', () =>
        {
            // Go to the orders page
            cy.wait(5000);
            cy.visit('/orders');
            cy.checkForError401();

            // Go to an unknown page
            const url = RandomText(10);
            cy.visit(url);
            cy.checkForError404(url);

            // Go to the home page
            cy.visit('/home');
        });
    });

    describe(('Login with a boss user and make him go on multiple pages that he has rights and not'), () =>
    {
        beforeEach('Login the user before all the tests', () => 
        {   
            // Get the user and the shop
            user = users.filter((user) => user.boss)[0]; 
            shop = shops.filter((shop) => shop.name === user.shop)[0];

            // Login to the user
            cy.login(user.email, user.password);
        });

        it('Check the home page text', () => 
        {
            // Check if the home page is correctly displayed
            cy.checkHomePage(user, shop);
        });

        it('Check the user dashboard page, and check the content', () =>
        {
            // Go to the dashboard page
            cy.get('a').contains('Dashboard').click();
            cy.wait(5000);

            cy.checkDashboardPage(user, shop, shops);
        });

        it('Check if the user can go to the orders page', () =>
        {
            cy.wait(5000);
            cy.get('a').contains('Orders').should("exist").click();
            cy.location('pathname').should('eq', '/orders');
        });

        it('Try to trigger all the error pages that the user can have', () =>
        {
            // Go to the orders page
            cy.wait(5000);
            cy.get('a').contains('Orders').should('exist').click();
            cy.location('pathname').should('eq', '/orders');

            // Go to an unknown page
            const url = RandomText(10);
            cy.visit(url);
            cy.checkForError404(url);

            // Go to the home page
            cy.visit('/home');
        });
    });
    
    describe(('Try to login with non existant user and trigger errors'), () =>
    {

        it('Try to login a non existant user', () => 
        {
            // Login to the user
            cy.wait(5000);
            cy.login(RandomText(10), RandomText(10));
            cy.wait(5000);
            cy.location('pathname').should('eq', '/');
        });

        it('Try to trigger all the error pages that the user can have', () =>
        {
            // Go to the orders page
            cy.wait(5000);
            cy.visit('/orders');
            cy.checkForError403();

            // Go to an unknown page
            const url = RandomText(10);
            cy.visit(url);
            cy.location('pathname').should('eq', "/" + url);
            cy.checkForError403();

            // Go to login page
            cy.visit('/');
        });
    });

    afterEach('Logout the user', () =>
    {
        // Logout the user
        cy.logout();
    });
});
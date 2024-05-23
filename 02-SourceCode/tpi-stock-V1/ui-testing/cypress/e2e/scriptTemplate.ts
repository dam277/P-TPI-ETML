/************************************
 * {But du test}
 * ---
 * Author => {auteur}
 * Description :
 *  {description}
 *  Canton => {canton}
*************************************/

/** La documentation pour créer un script et savoir comment le modifier convenablement est sur confluence https://jirap1.axari.ch:8093/confluence/pages/viewpage.action?pageId=90426682 */

// Import functons that we need to code
import { Random, RandomText, GetVersion, GetLanguageDatas } from "../support/functions";
import * as enums from "../support/enums";

// Import fixture types
import type jsonTemplate from '../fixtures/jsonTemplate.json';
import type jsonTemplate2 from '../fixtures/jsonTemplate2.json';

/**
 * {Description of the entire test}
 */
describe(("Description du test entier (Créer un détenteur et le modifier et ainsi aller voir sur eAdresse et modifier son adresse)"), () =>
{
    let testDatas1: typeof jsonTemplate, testDatas2: typeof jsonTemplate2;     // All datas of the json file

    /**
     * Get before all tests the datas
     */
    before("Récupérer les données avant de faire des tests", () =>
    {
        cy.fixture("jsonTemplate").then((datas) => testDatas1 = datas);
        cy.fixture("jsonTemplate2").then((datas) => testDatas2 = datas);
    });

    /**
     * Do something before each test
     */
    beforeEach("", () =>
    {
        // TODO
    });

    /**
     * {Description of an entire secondary test (Create a holder and modify it)}
     */
    describe(("Description d'un test secondaire entier (Créer un détenteur et le modifier)"), () =>
    {
        const language = enums.LANGUAGES.FR;                        // Language of the website
        let testVariable1: string, testVariable2: number;           // Variables for the tests if needed

        /**
         * Set the url to visit and login to cari before all the next normal and entire tests 
         */
        beforeEach("Définir l'URL à visiter et login sur cari avant tous les tests normaux et entiers suivants", () => 
        {   
            // Get the url and redirect
            cy.visit(testDatas1.url);

            // Login to cari hybride/angular
            cy.login(testDatas1.login.username, testDatas1.login.password);
            // cy.loginPrivateVolunteer(testDatas1.login.name, testDatas1.login.holderNumber, testDatas1.login.matriculeNumber);

            cy.changeCariLanguage(language);
        });

        /** A effacer : Ici nous utilisons un it() pour définir une tâche précise, ici pour créer un détenteur, car nous n'avons pas besoin de plusieurs tests pour créer un détenteur ce qui
         * impliquerait une actualisationde la page et donc, cela ne fonctionnerait pas en plusieurs tests, étand donné que tous les tests sont soumis au
         * beforeEach au dessus.
         * 
         * Le describe() est utilisé par contre, pour définir plusieurs tests dans le même but principal et y integrer des tâches précises avec des it().
         * ici pour modifier le détenteur, c'est une tâche générique, car nous pouvons le modifier de plusieurs manières et on y met chaque it() avec un but précis :
         * infos perso, adresse de facturatio, communication(email, etc...), ...
        */

        /**
         * {Description of a normal test (create a holder)}
         */
        it("Description d'un test normal (créer un détenteur)", () => 
        {
           // TODO 
        });

        /**
         * {Description of a tertiary integer test (Edit created holder)}
         */
        describe("Description d'un test entier terciaire (Modifier le détenteur créé)", () => 
        {      
            let testVariable3: boolean, testVariable4: string;           // Variables for the tests if needed

            /**
             * {Description of a normal test (Modify the holder: Modify his personal information)}
             */
            it("Description d'un test normal (Modifier le détenteur : Modifier ses informations personnelles)", () => 
            {
                // TODO 
            });

            /**
             * {Description of a normal test (Modify the holder: Modify his means of communication)}
             */
            it("Description d'un test normal (Modifier le détenteur : Modifier ses moyens de communication)", () => 
            {
                // TODO 
            });
        });
    });

    /**
     * {Description of an entire secondary test (Go to eAddress and modify its address)}
     */
    describe(("Description d'un test secondaire entier (Aller voir sur eAdresse et modifier son adresse)"), () => 
    { 
        let testVariable5, testVariable6;           // Variables for the tests if needed

        /**
         * Set the viewport, set the url to visit and login to eAdresse before all the next normal and entire tests 
         */
        beforeEach("Définir la fenêtre d'affichage, définir l'URL à visiter et login sur eAdresse avant tous les tests normaux et entiers suivants", () => 
        {
            // Get the url and redirect
            cy.visit(testDatas1.url);

            // Login to cari hybride/angular
            cy.login(testDatas1.login.username, testDatas1.login.password);
        });

        /**
         * {Description of a normal test (Modify the holder's address)}
         */
        it("Description d'un test normal (Modifier l'adresse du détenteur)", () => 
        {
            // TODO 
        });
    });

    /**
     * Do something after all tests
     */
    after("", () =>
    {
        // TODO
    });

    /**
     * Do something before each test
     */
    afterEach("", () =>
    {
        // TODO
    });
});
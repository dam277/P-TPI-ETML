import * as enums from "../enums";

/**
 * Logger class to log messages to the Cypress log and a file
 * @class Logger
 * @public
 * @example
 *  const logger = new Logger("logs.log");
 *  logger.log("This is a log message", LOGTYPES.DEFAULT, "log");
 *  logger.log("This is an error message", LOGTYPES.ERROR);
 */
export class Logger
{
    path = "cypress/support/utils/logs/" // Path of the log file

    /**
     * Constructor
     * @param {string} fileName Name of the log file
     * @constructor
     * @public
     * @memberof Logger
     * @example
     *  const logger = new Logger("logs.log");
     */
    constructor(fileName: string = "logs")
    {
        this.path += `${fileName.split("\\").pop().replace(/\.[^/.]+$/, "")}.log`;
        cy.writeFile(this.path, "");
    }

    /**
     * Logs a message to the Cypress log
     * @param {string} message Message to log
     * @param {string} logtype Type of the log
     * @param {string} title Title of the log
     * @public
     * @memberof Logger
     * @example
     *  logger.log("This is a log message", LOGTYPES.DEFAULT, "log");
     *  logger.log("This is an error message", LOGTYPES.ERROR);
     * @returns {void}
     * @throws {Error} If the message is not provided
     */
    log(message: string, logtype: enums.LOGTYPES = enums.LOGTYPES.DEFAULT, title: string = "LOG")
    {
        // If the message is not provided, throw an error
        if (!message)
            throw new Error("Message is required to log");

        // Get the name of the log type
        const logName = Object.keys(enums.LOGTYPES).find(key => enums.LOGTYPES[key] === logtype) || logtype;

        // Get the current date and time in the format: yyyy-mm-dd hh:mm:ss and set the log message
        const currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const log = `${currentDate} [${logName}] - ${title} - ${message}\n`;    

        // Log the message to the Cypress log and write it to a file
        cy.writeFile(this.path, log, { flag: "a" })
        cy.log(message, logtype, title);
    }
    
    /**
     * Create a custom log style
     * @param {string} name Name of the custom log
     * @param {string} colour Colour of the custom log
     * @public 
     * @static
     * @memberof Logger
     * @example
     * Logger.createCustomLog("custom", "#000");
     * @returns {void}
     * @throws {Error} If the name or colour is not provided
     */
    static createCustomLog(name: string, colour: string)
    {
        // If the name or colour is not provided, throw an error
        if (!name || !colour)
            throw new Error("Name and colour are required to create a custom log");

        // Get the style tag from the head
        const style = Cypress.$(window.top.document.head).find("#cypress-custom-log-style");

        // If the style tag does not exist, create it
        if (style.length === 0)
        {   
            // Create the style tag
            const logStyle = document.createElement('style');
            logStyle.id = "cypress-custom-log-style";
            addStyle(logStyle);
            
            // Append the style tag to the head
            Cypress.$(window.top.document.head).append(logStyle);
        }
        else
            addStyle(style);

        /**
         * Add the custom log to the style tag
         * @param {HTMLHeadElement|JQuery<HTMLHeadElement>} styleTag => Style tag to add the custom log to
         */
        function addStyle(styleTag: HTMLHeadElement|JQuery<HTMLHeadElement>)
        {   
            // Append the custom log to the style tag
            styleTag.append(document.createTextNode
            (`
                .command-name-log-${name}
                {
                    padding: 0 0 0 7px;
                    background-color: ${colour};
                    color: #fff !important;
                }

                .command-name-log-${name} span.command-info
                {
                    border: 2px solid ${colour};
                    padding: 2px;
                }
            `));
        }
    }
}

// Remove the custom logs styles
Cypress.$(window.top.document.head).find("#cypress-custom-log-style").remove();

// Add the custom logs styles
Object.keys(enums.LOGTYPES).forEach((key) => Logger.createCustomLog(key, enums.LOGTYPES[key]));
import mysql from "mysql2"
import Base from "../Base"
import { Connection } from "mysql2/typings/mysql/lib/Connection";

/**
 * Database class
 * @class Database
 * @extends Base
 * @description The class that handles the database connection and queries
 * @example
 * // Get the instance of the database
 * const databaseInstance = Database.GetInstance();
 */
class Database extends Base
{
    /**
     * Variables
     */
    public static instance: Database = null;        // The instance of the database
    private connection: Connection;                 // The connection to the database
    private result: Object|any                      // The result of the query

    /**
     * Database class constructor
     * @param {Object} configs The configurations of the database
     * @description The class that handles the database connection and queries
     * @public
     * @constructor
     */
    public constructor(configs: Object)
    {
        super();
        this.connection = mysql.createConnection(configs);
        this.connection.connect((err) => 
        {
            if (err) throw err;
            console.log('Connected!');
        });
    }

    /**
     * Get the instance of the database
     * @param {Object} configs The configurations of the database
     * @description Get the instance of the database
     * @example
     * @public
     * @returns {Database}
     */
    public static GetInstance(configs = {host: 'localhost', user: 'root', password: 'root'}): Database	
    {
        // If the instance is null, create a new instance
        if (Database.instance == null)
            Database.instance = new Database(configs);
        
        // Return the instance
        return Database.instance;
    }

    /**
     * Destroy the instance of the database
     * @description Destroy the instance of the database
     * @public @static
     * @returns {void}
     */
    public static DestroyInstance(): void
    {
        Database.instance = null;
    }

    /**
     * Execute a simple query
     * @param {string} query The query to execute
     * @description Execute a simple query
     * @public @static
     * @returns The result of the query
     */
    public SimpleExec(query: string): Object
    {
        // Execute the query
        this.connection.query(query, (err, result) => 
        {
            // If there is an error, log it
            if (err) console.log(err);
            this.result = result;
        });

        // Return the result
        return this.result;
    }
    /**
     * Execute a query with binding
     * @param {string} query The query to execute
     * @param {Array} values The values to bind
     * @description Execute a query with binding
     * @public @static
     * @returns The result of the query
     */
    public BindExec(query: string, values: Array<any>): Object
    {
        // Execute the query
        this.connection.query(query, values, (err, result) => 
        {
            // If there is an error, log it
            if (err) console.log(err);
            this.result = result;
        });

        // Return the result
        return this.result;
    }
}

export default Database;

import fs from "fs"  // File system module
import Database from "./classes/database/Database"; // Database class
import excelToJson from "convert-excel-to-json"; // Excel to JSON module
const XLSX = require('xlsx')

// Export the tasks
const Tasks =
{
    /**
     * @function getLastDownload => Get the last modified files
     * @param {String} dirPath => Path of the directory where are the wanted files
     * 
     * @returns {String} => Return the last modified file
     */
    getLastFile: (dirPath: string) =>
    {
        // Get the last modified files
        const files = fs.readdirSync(dirPath);

        let lastModification = 0; // Last modification time
        let lastFile = null;      // Last file

        // Loop the files to see one by one which is the last
        files.map((file, index) => 
        {
            const actualFile = `${dirPath}/${file}`;    // Set the actual file path
            const stats = fs.statSync(actualFile);      // Set the stats of the actual file

            // Check if it is a file and if the actual was modified more recently than the last
            if(stats.isFile() && (stats.mtimeMs > lastModification || index == 0))
            {
                // Set the last file and her stats
                lastFile = actualFile;
                lastModification = stats.mtimeMs;
            }
        });

        return lastFile;
    },
    /**
     * @function excelToJsonConvertor => Convert an excel file to JSON
     * @param {String} fileNamePath => File path name
     * 
     * @returns {JSON} => Json content of the excel file
     */
    excelToJsonConvertor: (fileNamePath: string): { [key: string]: any[] } =>
    {   
        // Convert the excel file to JSON
        const result = excelToJson(
        {
            source: fs.readFileSync(fileNamePath)
        });
        return result
    },
    queryDb: ({query, values = [], simpleExec = true}): Object =>
    {
        // Execute the query and get the result
        let result;
        if (simpleExec)
            result = Database.GetInstance().SimpleExec(query);
        else
            result = Database.GetInstance().BindExec(query, values);

        // Return the result or null if it is empty
        return result ? result : null;
    },
    /**
     * @function convertXLSXToJSON = Convert an excel file to JSON 
     * @param {string} filePath => Path of the excel file
     * 
     * @returns {JSON} => Content of the excel file
     */
    convertXLSXToJson:(filePath: string) => 
        {

        const workbook = XLSX.readFile(filePath)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        return jsonData

      },
}

export default Tasks; // Export the tasks
import fs from "fs"  // File system module
import Database from "./classes/database/Database"; // Database class
import excelToJson from "convert-excel-to-json"; // Excel to JSON module
const XLSX = require('xlsx')

// Export the tasks
const Tasks =
{
    convertExcelToJson: ({filePath}: {filePath: string}) =>
    {
        // Convert the excel file to json
        const result = excelToJson({ sourceFile: filePath });
        return result;
    }
}

export default Tasks; // Export the tasks
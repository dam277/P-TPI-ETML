import fs from "fs"  // File system module
import excelToJson from "convert-excel-to-json"; // Excel to JSON module

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
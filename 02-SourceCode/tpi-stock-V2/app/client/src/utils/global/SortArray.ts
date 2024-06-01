/**
 * @file SortArray.ts
 * @description Sort an array of objects by a column
 * @author Damien Loup
 */

/**
 * Sort an array of objects by a column
 * @param e => Event on column click
 * @param arrayToSort => Array to sort
 * @param sort => Sort object
 * @param setSort => Set the sort object
 * 
 * @returns {void}
 * @example
 * onClick={(e) => handleSort(e, articles, sort, setSort)}
 */
function SortArray(e: React.MouseEvent<HTMLElement, MouseEvent>, arrayToSort: any[], sort: {column: string, order: boolean}, setSort: Function, identification: string): void
{
    // Check if the column is already sorted
    if (sort.column !== e.currentTarget.id)
    {
        // Get the last clicked column and remove the sort order
        const lastClicked = document.getElementById(sort.column);
        if (lastClicked)
            lastClicked.innerHTML = lastClicked.innerHTML.replace(/▼|▲/g, "");
    }

    // Get the column to sort and set the sort order
    const column: string = e.currentTarget.id;
    setSort({column: column, order: !sort.order});

    // Set the sort icon
    e.currentTarget.innerHTML = `${e.currentTarget.innerHTML.replace(/▼|▲/g, "")} ${sort.order ? "▼" : "▲"}`;

    // Sort the articles
    arrayToSort.sort((a: any, b: any) => 
    {
        // Get the column name
        const columnName = column.replace(`${identification}-`, "").split(":")[0];

        // Get the properties to compare
        const aProp = a[columnName] || (a.article && a.article[columnName]) || (a.order && a.order[columnName]) || (a.user && a.user[columnName]) || 0;
        const bProp = b[columnName] || (b.article && b.article[columnName]) || (b.order && b.order[columnName]) || (b.user && b.user[columnName]) || 0;

        // Sort the articles
        if (sort.order) 
            return aProp > bProp ? 1 : -1;
        else 
            return aProp < bProp ? 1 : -1;
    });
}

// Export the sort function
export default SortArray;
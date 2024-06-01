/**
 * @file InventorySummary.tsx
 * @description Inventory summary component to display the number of articles sold, in stock and in order
 * @author Damien Loup
 */

// Import interfaces
import IArticle from "../../utils/interfaces/IArticle";
import IOrder from "../../utils/interfaces/IOrder";
import IUser from "../../utils/interfaces/IUser";

/**
 * Inventory summary component to display the number of articles sold, in stock and in order
 * @param articles => article list with units solded and stored
 * @param orders => order list with associated user and article 
 * @returns => Inventory summary component
 */
function InventorySummary({ articles, orders } : { articles: [{article: IArticle, unitsSolded: number, unitsStored: number}], orders: [{ order: IOrder, user: IUser, article: IArticle }]}) 
{
    // Get the number of articles sold, in stock and in order
    const articlesSold = articles.reduce((acc, {unitsSolded}) => acc + unitsSolded, 0);
    const articlesInStock = articles.reduce((acc, {unitsStored}) => acc + unitsStored, 0);
    const articlesInOrder = orders.filter(({order}) => order.status.toLowerCase() === "pending").reduce((acc, {order}) => acc + order.units, 0);    

    // Return the inventory summary component
    return (
        <section id="inventorySummary" className="flex justify-center text-center w-full">
            <div className="bg-colorpalette-backgrounds-secondary p-2 mx-20">
                <h3>Items sold</h3>
                <span>{articlesSold}</span>
            </div>
            <div className="bg-colorpalette-backgrounds-secondary p-2 mx-20">
                <h3>Items in stock</h3>
                <span>{articlesInStock}</span>
            </div>
            <div className="bg-colorpalette-backgrounds-secondary p-2 mx-20">
                <h3>Items in order</h3>
                <span>{articlesInOrder ? articlesInOrder : 0}</span>
            </div>
        </section>
    );
}

export default InventorySummary;
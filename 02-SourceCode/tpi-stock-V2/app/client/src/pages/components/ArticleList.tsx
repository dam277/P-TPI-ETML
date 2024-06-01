/**
 * @file ArticleList.tsx
 * @description Article list component to display the list of articles
 * @author Damien Loup
 */

// Import libraries
import { useState } from "react";

// Import interfaces
import IArticle from "../../utils/interfaces/IArticle";
import IShop from "../../utils/interfaces/IShop";

// Import globals
import SortArray from "../../utils/global/SortArray";

/**
 * Article list component to display the list of articles
 * @param articles => article list with units solded and stored
 * @returns => Article list component
 */
function ArticleList({ articles, shop } : { articles: [{article: IArticle, unitsSolded: number, unitsStored: number, status: string}], shop: IShop}) 
{
    // Set the sort state
    const [sort, setSort] = useState<{column: string, order: boolean}>({column: "A-id_article", order: true});

    // Sort the articles
    const handleSort = (e: React.MouseEvent<HTMLElement, MouseEvent>) => SortArray(e, articles, sort, setSort, "A")

    // Return the article list
    return (
        <table className="w-full text-left">
            <thead className="bg-colorpalette-backgrounds-secondary">
                <tr id="articles" className="cursor-pointer">
                    <th id={`A-id_article:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Art. No.</th>
                    <th id={`A-description:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Description</th>
                    <th id={`A-brand:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Brand</th>
                    <th id={`A-collection:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Collection</th>
                    <th id={`A-size:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Size</th>
                    <th id={`A-color:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Color</th>
                    <th id={`A-unitsSolded:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Units solded</th>
                    <th id={`A-unitsStored:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Units stored</th>
                    <th id={`A-status:${shop.id_shop}`} onClick={(e) => handleSort(e)} className="p-2 hover:bg-zinc-600">Status</th>
                </tr>
            </thead>
            <tbody className="bg-colorpalette-backgrounds-tertiary">
                {articles.map(({article, unitsSolded, unitsStored, status}) =>
                    <tr className={`${unitsStored !== 0 ? "border-colorpalette-status-ok" : "border-colorpalette-status-notOk"} border-2 p-2`} key={`article-${article.id_article}`}>
                        <td className="p-2">A-{article.id_article}</td>
                        <td className="p-2">{article.description}</td>
                        <td className="p-2">{article.brand}</td>
                        <td className="p-2">{article.collection}</td>
                        <td className="p-2">{article.size}</td>
                        <td className="p-2">{article.color}</td>
                        <td className="p-2">{unitsSolded}</td>
                        <td className="p-2">{unitsStored}</td>
                        <td className={`${unitsStored !== 0 ? "bg-colorpalette-status-ok " : "bg-colorpalette-status-notOk"} p-2`}>{status}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default ArticleList;
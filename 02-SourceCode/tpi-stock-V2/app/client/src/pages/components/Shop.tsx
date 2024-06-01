/**
 * @file ArticleList.tsx
 * @description Article list component to display the list of articles
 * @author Damien Loup
 */

// Import libraries
import { useEffect } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

// Import components
import ArticleList from "./ArticleList";
import OrderList from "./OrderList";

// Import interfaces
import IShop from "../../utils/interfaces/IShop";

/**
 * OrderList component to display the list of orders
 * @param orders => List of orders
 * @returns => OrderList component
 */
function Shop({ shop, apiEndpoint } : { shop: IShop, apiEndpoint: string})
{
    // Get makeApiCall function, data, loading and error from useFetch hook
    const [ dataApiCall, data, dataLoading, dataError ] = useFetch<any>();

    // Fetch the shop of the user
    useEffect(() => 
    {
        dataApiCall(`/shop/${shop.id_shop}/${apiEndpoint}`, "GET");
    }, []);

    return (
        <div key={`shop-${shop.id_shop}`}>
            <h2 className="text-2xl pl-2">{shop.name} {apiEndpoint === "articles" ? "Stock" : "Orders"}</h2>
            {data && data.articles &&
                <ArticleList shop={shop} articles={data.articles}/>
            }
            {data && data.orders &&
               <OrderList shop={shop} orders={data.orders} dataApiCall={dataApiCall}/> 
            }
        </div>
    );
}

export default Shop;
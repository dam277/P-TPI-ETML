/**
 * @file Orders.tsx
 * @description Displays the orders of the shop
 * @author Damien Loup
 */

// Import libraries
import { useContext, useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

// Import contexts
import { UserContext } from "../../utils/contexts/UserContext";

// Import interfaces
import IShop from "../../utils/interfaces/IShop";
import IArticle from "../../utils/interfaces/IArticle";
import IOrder from "../../utils/interfaces/IOrder";
import IUser, { IUserContext } from "../../utils/interfaces/IUser";

// Import components
import InventorySummary from "../components/InventorySummary";
import Shop from "../components/Shop";

// Import includes
import Main from "../includes/Main";
import Sidebar from "../includes/Sidebar";

/**
 * Orders component to display the orders of the shop
 * @returns => Orders component
 */
function Orders() 
{
    // Get user context
    const { actualUser } = useContext<IUserContext>(UserContext as any);

    // Get makeApiCall function, data, loading and error from useFetch hook for shop, articles and orders
    const [ shopApiCall, shopData, shopLoading, shopError ] = useFetch<{shop: IShop, shops: IShop[]}>();
    const [ articlesApiCall, articleData, articleLoading, articleError ] = useFetch<{articles: [{article: IArticle, unitsSolded: number, unitsStored: number}]}>();
    const [ ordersApiCall, orderData, orderLoading, orderError, orderSetData ] = useFetch<{orders: [{ order: IOrder, user: IUser, article: IArticle }]}>();

    // Fetch the shop of the user
    useEffect(() => 
    {
        if(actualUser)
            // Check if the user is a boss
            if (actualUser.isBoss)
            {
                // Fetch all shops, articles and orders
                shopApiCall("/get_shops", "GET");
                ordersApiCall("/get_orders", "GET");
                articlesApiCall("/get_articles", "GET");
            }
            else
                window.location.href = "/401";
    }, [actualUser]); 

    // Return the dashboard component
    return (
        <Main>
            <Sidebar />
            <div className="w-full p-16">
                <div className="flex">
                    <h1 className="text-4xl flex-1">
                        { shopData?.shop ? 
                            shopData.shop.name : "All shops"}
                        </h1>
                </div>
                <article>
                    <div className="p-5"></div>
                    {articleData?.articles && orderData?.orders &&
                        <InventorySummary articles={articleData.articles} 
                                          orders={orderData.orders} />
                    }
                    {shopData?.shops && shopData.shops.map((shop) => 
                        <Shop shop={shop} apiEndpoint={"orders"} />
                    )}
                </article>
            </div>
        </Main>
    );
}

export default Orders;
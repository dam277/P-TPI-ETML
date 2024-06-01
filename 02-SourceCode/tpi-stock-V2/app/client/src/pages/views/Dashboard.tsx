/**
 * @file Dashboard.tsx
 * @description Displays the dashboard of the application
 * @author Damien Loup
 */

// Import libraries
import { useFetch } from "../../utils/hooks/useFetch";
import { useContext, useEffect } from "react";

// Import interfaces
import IShop from "../../utils/interfaces/IShop";
import IArticle from "../../utils/interfaces/IArticle";
import IUser, { IUserContext } from "../../utils/interfaces/IUser";
import IOrder from "../../utils/interfaces/IOrder";

// Import contexts
import { UserContext } from "../../utils/contexts/UserContext";

// Import includes
import Main from "../includes/Main";
import Sidebar from "../includes/Sidebar";

// Import components
import InventorySummary from "../components/InventorySummary";
import ArticleList from "../components/ArticleList";
import OrderList from "../components/OrderList";
import Shop from "../components/Shop";

// Import images
//@ts-ignore
import importLogo from "../../resources/images/importLogo.png";

/**
 * Dashboard component to display the dashboard of the application
 * @returns => Dashboard component
 */
function Dashboard() 
{
    // Get user context
    const { actualUser } = useContext<IUserContext>(UserContext as any);

    // Get makeApiCall function, data, loading and error from useFetch hook for shop, articles and orders
    const [ shopApiCall, shopData, shopLoading, shopError ] = useFetch<{shop: IShop, shops: IShop[]}>();
    const [ articlesApiCall, articleData, articleLoading, articleError ] = useFetch<{articles: [{article: IArticle, unitsSolded: number, unitsStored: number, status: string}]}>();
    const [ ordersApiCall, orderData, orderLoading, orderError ] = useFetch<{orders: [{ order: IOrder, user: IUser, article: IArticle }]}>();
    const [ importFileApiCall, importFileData, importFileLoading, importFileError ] = useFetch<{}>();

    // Fetch the shop of the user
    useEffect(() => 
    {
        if(actualUser)
            // Check if the user is a boss
            if (actualUser.isBoss)
            {
                // Fetch all shops
                shopApiCall("/get_shops", "GET");
                ordersApiCall("/get_orders", "GET");
                articlesApiCall("/get_articles", "GET");
            }
            else
                // Fetch the shop of the user
                shopApiCall(`/user/${actualUser.id_user}/shop`, "GET").then((data) => 
                {
                    // Fetch the articles and orders of the shop
                    articlesApiCall(`/shop/${data.shop.id_shop}/articles`, "GET");
                    ordersApiCall(`/shop/${data.shop.id_shop}/orders`, "GET");
                });
    }, [actualUser]);   
    
    /**
     * Handle the import of a file to update the stock or make orders
     * @param e => Event of the input file
     */
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>): void => 
    {
        // Check if there is a file
        if(e.target.files)
        {
            // Get the file and create a form data
            const file: File = e.target.files[0];
            const formData = new FormData();
            formData.append("import_file", file);

            // Check if the file is an excel file, if not, send an alert
            if(!file.type.includes("application/vnd.ms-excel"))
            {
                alert("The file must be an excel file");
                return;
            }

            // Call the API to import the stock
            importFileApiCall(`/import_stock`, "POST", formData)

            // Reload the page
            window.location.reload();
        }
    }

    // Return the dashboard component
    return (
        <Main>
            <Sidebar />
            <div className="w-full p-16">
                <div className="flex">
                    <h1 className="text-4xl flex-1">{ shopData?.shop ? shopData.shop.name : "All shops"}</h1>
                    <div className="flex">
                        {actualUser && !actualUser.isBoss && 
                            <label htmlFor="importFileInput" className="flex-1 bg-colorpalette-button-color rounded-md hover:bg-opacity-80 px-6 text-center cursor-pointer">
                                <div className="flex h-full">
                                    <span className="m-auto">Import stock</span>
                                    <img className="h-6 pl-1 m-auto" src={importLogo} alt="import logo"/>
                                </div>
                                <input id="importFileInput" type="file" accept=".xlsx,.xlsm" onChange={(e) => handleImport(e)} className="hidden" />
                            </label>
                        }
                    </div>
                </div>
                <article>
                    <div className="p-5"></div>
                    {articleData?.articles && orderData?.orders &&
                        <InventorySummary articles={articleData.articles} orders={orderData.orders} />
                    }
                    {shopData?.shops ? 
                        shopData.shops.map((shop) => <Shop shop={shop} apiEndpoint={"articles"}/>)
                        : 
                        (
                            <section>
                                <h2 className="text-2xl pl-2">Stock</h2>
                                {articleData?.articles && shopData?.shop &&
                                    <ArticleList shop={shopData?.shop} articles={articleData.articles}/>
                                }
                                <h2 className="text-2xl pl-2 mt-5">Orders</h2>
                                {orderData?.orders && shopData?.shop &&
                                    <OrderList shop={shopData.shop} orders={orderData.orders} dataApiCall={undefined} />
                                }
                            </section>
                        )
                    }
                </article>
            </div>
        </Main>
    );
}

export default Dashboard;
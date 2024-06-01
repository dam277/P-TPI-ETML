/**
 * @file Home.tsx
 * @description Home component to display the home page of the application
 * @author Damien Loup
 */

// Import libraries
import { useContext, useEffect } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

// Import interfaces
import { IUserContext } from "../../utils/interfaces/IUser";
import IShop from "../../utils/interfaces/IShop";

// Import context
import { UserContext } from "../../utils/contexts/UserContext";

// Import includes
import Main from "../includes/Main";
import Sidebar from "../includes/Sidebar";

/**
 * Home component to display the home page of the application
 * @returns => Home component
 */
function Home() 
{
    // Get user context
    const { actualUser } = useContext<IUserContext>(UserContext as any);

    // Get makeApiCall function, data, loading and error from useFetch hook
    const [ shopApiCall, shopData, shopLoading, shopError ] = useFetch<{shop: IShop}>();

    // Fetch the shop of the user
    useEffect(() => 
    {
        // Fetch the shop of the user
        if (actualUser && !actualUser.isBoss)
            shopApiCall(`/user/${actualUser.id_user}/shop`, "GET");
    }, [actualUser]);
    
    // Return the home component
    return (
        <Main>
            <Sidebar />
            <div className="flex flex-col text-center w-full mt-60 text-4xl">
                <div>
                    <h1 className="text-8xl m-5">Welcome { actualUser && actualUser.name }</h1>
                    <p>You actually are in the shop stock { shopData?.shop && `${shopData.shop.name} in ${shopData.shop.city}` }</p>
                    <p>All of the stocks and orders are displayed { actualUser && actualUser.isBoss ? "separately on dashboard and orders pages" : " on your dashboard"}</p>
                    { actualUser && !actualUser.isBoss && 
                        <p>
                            You can order articles by importing “order excel file” and only the master of the website can approve it. <br />
                            You can also add articles to your stock by importing “stock excel file”
                        </p>
                    }
                </div>
                { shopData?.shop &&
                    <div id="shop" className="flex justify-center mt-10">
                        <div className="h-60 w-60 bg-colorpalette-active flex items-center justify-center">
                            { shopData.shop.name }
                        </div>
                    </div>
                }
            </div>
        </Main>
    );
}

export default Home;
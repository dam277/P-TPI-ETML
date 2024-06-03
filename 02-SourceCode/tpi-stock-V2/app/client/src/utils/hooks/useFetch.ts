/**
 * @file useFetch.ts
 * @description Custom hook to fetch data from the API
 * @author Damien Loup
 */

// Import libraries
import { useState } from "react";
import { useLocation } from "react-router-dom";

// Import configs
import Configs from "../../configs/Configs";

/**
 * Custom hook to fetch data from the API
 * @returns => A function to fetch data from the API, the data fetched, the loading state and the error
 * 
 * @example
 * const [ makeApiCall, data, loading, error ] = useFetch<{shop: IShop, shops: IShop[]}>();
 */
export const useFetch = <DataType> (): [ makeApiCall: <T extends DataType>(url: string, method: string, body?: {} | [] | null, contentType?: any , displayError?: boolean) => Promise<T>, data: DataType|null, loading: Boolean, error: string|undefined, setData: Function] => 
{
    const [data, setData] = useState<DataType|null>(null);              // Data fetched from the URL
    const [loading, setLoading] = useState<boolean>(false);             // Loading state
    const [error, setError] = useState<string>();                       // Error state

    const location = useLocation();                                     // Get the current location

    /**
     * Function to fetch data from the API
     * @param url URL to fetch data from
     * @param method Method to use for fetching data
     * @param body Body to send with the request
     * @returns 
     */
    const makeApiCall = <T extends DataType> (url: string, method: string, body: any = null, contentType: any = null, displayError: Boolean = true): Promise<T> =>
    {
        // If no URL is provided, return
        if (!url) return Promise.reject("No URL provided");
        
        // Set the API URL
        const API_URL = Configs.API_URL + url;    

        // Fetch the data from the URL sent
        return fetch(API_URL, 
        {
            method: method,
            headers: contentType !== null ? 
            {
                "Content-Type": contentType,
            } : undefined,
            body: body instanceof FormData ? body : (body ? JSON.stringify(body) : null),
        })
        .then((res) => 
        {
            setLoading(true);
            setError("");

            // Get the status code
            const status = res.status.toString();

            // If the status code is not starting with 2, display the error
            if(!status.startsWith("2") && displayError && location.pathname !== `/${status}`)
            {
                // Redirect to the associated error page
                switch (status)
                {
                    case "401":
                        window.location.href = "/401";
                        break;
                    case "403":
                        window.location.href = "/403";
                        break;
                    case "404":
                        window.location.href = "/404";
                        break;
                }

                // Set the error
                res.json().then((data) => displayError && setError(data.message));
                return;
            }

            // Return the data
            return res.json();
        })
        .then((data) => 
        {
            // Set the data and return it
            setData(data);
            return data;
        })
        .finally(() => setLoading(false));
    }
    
    // Return the data, loading state and error
    return [ makeApiCall, data, loading, error, setData ];
}




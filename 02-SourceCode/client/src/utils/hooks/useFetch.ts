import { useState, useEffect } from "react";
import Configs from "../../configs/Configs";

export const useFetch = (): [ makeApiCall: (url: string, method: string, body: {} | []) => Promise<any>|undefined, data: {}|null, loading: Boolean, error: string|undefined] => 
{
    const [data, setData] = useState<{}|null>(null);                  // Data fetched from the URL
    const [loading, setLoading] = useState<boolean>(false);            // Loading state
    const [error, setError] = useState<string>();                     // Error state

    const makeApiCall = (url: string, method: string, body: {}|[]) =>
    {
        // If no URL is provided, return
        if (!url) return;

        // Set the API URL
        const API_URL = Configs.API_URL + url;        
        
        // Fetch the data from the URL sent
        return fetch(API_URL, 
        {
            method: method,
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((res) => 
        {
            setLoading(true);
            setError("");
            if(!res.status.toString().startsWith("2"))
            {
                res.json().then((data) => setError(data.message));
                return;
            }
            return res.json();
        })
        .then((data) => 
        {
            setData(data);
            return data;
        })
        .finally(() => setLoading(false));
    }
    
    
    // Return the data, loading state and error
    return [ makeApiCall, data, loading, error ];
}
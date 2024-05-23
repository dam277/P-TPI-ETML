import { useState, useEffect } from "react";
import Configs from "../../configs/Configs";

export const useFetch = (): [ makeApiCall: (url: string, method: string, body: {} | [] | null) => Promise<any>|undefined, data: {}|null, loading: Boolean, error: string|undefined] => 
{
    const [data, setData] = useState<{}|null>(null);                  // Data fetched from the URL
    const [loading, setLoading] = useState<boolean>(false);           // Loading state
    const [error, setError] = useState<string>();                     // Error state
    console.log(Configs)
    const makeApiCall = async (url: string, method: string, body: {}|[]|null = null) =>
    {
        // If no URL is provided, return
        if (!url) return;
        
        // Set the API URL
        const API_URL = Configs.API_URL + url;    

        // Fetch the data from the URL sent
        fetch(API_URL, 
        {
            method: method,
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
        })
        .then((res) => 
        {
            console.log("response", res);
            setLoading(true);
            setError("");
            if(!res.status.toString().startsWith("2"))
            {
                console.log("error");
                res.json().then((data) => setError(data.message));
                return;
            }
            return res.json();
        })
        .then((data) => 
        {
            console.log(data);
            setData(data);
            return data;
        })
        .finally(() => setLoading(false));
    }
    
    
    // Return the data, loading state and error
    return [ makeApiCall, data, loading, error ];
}
import { useState, useEffect } from "react";
import Configs from "../../configs/Configs";

export const useFetch = (url: string): [ {}|null, Boolean, {}|null ] => 
{
    const API_URL = Configs.API_URL + url;                        // API URL

    const [data, setData] = useState<{}|null>(null);                  // Data fetched from the URL
    const [loading, setLoading] = useState<boolean>(true);        // Loading state
    const [error, setError] = useState<{}|null>(null);                // Error state

    useEffect(() =>
    {
        // If no URL is provided, return
        if (!url) return;
        
        // Fetch the data from the URL sent
        fetch(API_URL)
        .then((res) => res.json())
        .then((data) => 
        {
            setData(data);
        })
        .catch((err) => alert(err))
        .finally(() => setLoading(false));
    }, [url, API_URL]);
    
    // Return the data, loading state and error
    return [ data, loading, error ];
}
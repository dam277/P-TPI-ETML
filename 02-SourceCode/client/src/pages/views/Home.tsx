// Import libraries
import React, { useState, useContext } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

// Import interfaces
import User from "../../utils/interfaces/User";

// Import context
import { UserContext } from "../../utils/contexts/UserContext";

function Home() 
{
    // Get makeApiCall function, data, loading and error from useFetch hook
    const [makeApiCall, data, loading, error] = useFetch();

    // Get user context
    const { user, setUser } = useContext<{ user: User, setUser: Function }>(UserContext as any);

    // If the user is not logged in, redirect to the login page
    if(!user)
        document.location.href = "/";

    return (
        <div>
            {user && <h1>Welcome {user.username}</h1>}
        </div>
    );
}

export default Home;
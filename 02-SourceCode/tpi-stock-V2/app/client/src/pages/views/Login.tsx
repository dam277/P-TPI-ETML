// Import libraries
import React, { useState, useContext, useEffect } from "react";
import { useFetch } from "../../utils/hooks/useFetch";

import Configs from "../../configs/Configs";

// Import interfaces
import User from "../../utils/interfaces/User";

// Import context
import { UserContext } from "../../utils/contexts/UserContext";

function Login() 
{   
    console.log(Configs);
    // Get user context
    const { user, setUser } = useContext<{ user: User, setUser: Function }>(UserContext as any);

    // Set the states of email and password
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Get makeApiCall function, data, loading and error from useFetch hook
    const [makeApiCall, data, loading, error] = useFetch()

    useEffect(() => 
    {
        // If data is fetched 
        if(data)
        {
            console.log("data", data);

            // Set the user in the context
            setUser((data as {user: User}).user);
        }
    }, [data]);
    
    // fetch("http://localhost:5000/user").then(res => res.json()).then(data => console.log(data));
    // makeApiCall("/user", "GET", null)
    // fetch("http://localhost:5000/logout").then(res => res.json()).then(data => console.log(data));

    // if(user)
    //     document.location.href = "/home";

    /**
     * Handle Login and log the user in
     * @param e => Event on form submission
     */
    function handleLogin(e: React.FormEvent<HTMLFormElement>)
    {
        // Prevent form from submitting
        e.preventDefault();
        e.stopPropagation();
        makeApiCall("/login", "POST", { email: email, password: password });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <figure className="bg-colorpalette-backgrounds-secondary rounded-xl p-5 w-1/5">
                <h1 className="text-4xl text-colorpalette-texts-login font-bold">Login</h1>
                <form onSubmit={(e) => handleLogin(e)} className="flex flex-col text-2xl my-2">
                    <input id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-colorpalette-backgrounds-secondary outline-none border-b-2 border-slate-600 p-2 my-10" />
                    <input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} className="bg-colorpalette-backgrounds-secondary outline-none border-b-2 border-slate-600 p-2" />
                    {loading && <span className="my-5 text-center">Loading...</span>}
                    {error &&<span className="my-5 text-red-700 text-center">{error}</span>}
                    {!error && !loading && <br />}
                    <button type="submit" className="bg-colorpalette-button rounded-xl hover:bg-opacity-80 m-2 p-2">Login</button>
                </form>
            </figure>
        </div>
    );
}

export default Login;
/**
 * @file Login.tsx
 * @description Login component to display the login page of the application
 * @author Damien Loup
 */

// Import libraries
import React, { useState, useContext } from "react";

// Import includes
import Main from "../includes/Main";

// Import interfaces
import { IUserContext } from "../../utils/interfaces/IUser";

// Import contexts
import { UserContext } from "../../utils/contexts/UserContext";

/**
 * Login component to display the login page of the application
 * @returns => Login component
 */
function Login() 
{      
    // Get user context
    const { login, loading, error } = useContext<IUserContext>(UserContext as any);
    
    // Set the states of email and password
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    /**
     * Handle Login and log the user in
     * @param e => Event on form submission
     * 
     * @returns {void}
     * @example
     * onSubmit={(e) => handleLogin(e)}
     */
    function handleLogin(e: React.FormEvent<HTMLFormElement>): void
    {
        // Prevent form from submitting
        e.preventDefault();
        e.stopPropagation();
        login(email, password);
    }

    // Return the login form
    return (
        <Main>
            <div className="flex flex-col items-center justify-center h-screen">
                <figure className="bg-colorpalette-backgrounds-secondary rounded-xl p-5 w-1/5">
                    <h1 className="text-4xl text-colorpalette-texts-login font-bold">Login</h1>
                    <form onSubmit={(e) => handleLogin(e)} className="flex flex-col text-2xl my-2">
                        <input id="email" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} className="bg-colorpalette-backgrounds-secondary outline-none border-b-2 border-slate-600 p-2 my-10" />
                        <input id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} className="bg-colorpalette-backgrounds-secondary outline-none border-b-2 border-slate-600 p-2" />
                        {loading && <span className="my-5 text-center">Loading...</span>}
                        {error &&<span className="my-5 text-red-700 text-center">{error}</span>}
                        {!error && !loading && <br />}
                        <button type="submit" className="bg-colorpalette-button-color rounded-xl hover:bg-opacity-80 m-2 p-2">Login</button>
                    </form>
                </figure>
            </div>
        </Main>
    );
}

export default Login;
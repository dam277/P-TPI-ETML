/**
 * @file UserContext.tsx
 * @description User Context to manage the user session
 * @author Damien Loup
 */

// Import Hooks
import { useState, createContext, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { useFetch } from "../../utils/hooks/useFetch";

// Import Interfaces
import IUser, { IUserContext } from "../interfaces/IUser";

// Create Context
export const UserContext = createContext<IUserContext>({} as IUserContext);

/**
 * User Provider
 * @param {HTMLElement} children => Children element to display
 * @returns {HTMLElement} component html elements
 */
const UserProvider = ({ children }: {children: any}) => 
{
    // Set States
    const [actualUser, setUser] = useState<IUser>();

    // Get makeApiCall function, data, loading and error from useFetch hook
    const [makeApiCall, data, loading, error] = useFetch<{user: IUser}>();

    // Get location
    const location = useLocation();

    /**
     * Check User Session and redirect if needed
     * @param data => Data fetched from the API
     * 
     * @returns {void}
     * 
     * @example
     * checkUserSession(data);
     */
    function checkUserSession(data: {user: IUser}|any)
    {
        // If data fetched and user is set, set the user
        if (data && data.user)
        {
            // Set the user fetched
            setUser(data.user);

            // Check if user is already logged in
            if (location.pathname === "/")
                window.location.href = "/home";
        }
    }

    /**
     * Login the user and set the it
     * @param email => Email sent by the user
     * @param password => Password sent by the user
     * @returns {Promise<T>} => Promise with the data fetched
     * 
     * @example
     * login("email", "password");
     */
    const login = (email: string, password: string) => makeApiCall("/login", "POST", { email, password }, "application/json").then((data) => checkUserSession(data));

    /**
     * Logout the user
     * @returns {Promise<T>} => Promise with the data fetched
     * 
     * @example
     * logout();
     */
    const logout = () => makeApiCall("/logout", "GET").then((data) => window.location.href = "/");

    // Check for the user session on page load
    useEffect(() =>
    {
        // Fetch user data
        makeApiCall("/@me", "GET", null, null, location.pathname !== "/").then((data) => checkUserSession(data));
    }, []);

    // Return html elements
    return (
        <UserContext.Provider value={{ actualUser, login, logout, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
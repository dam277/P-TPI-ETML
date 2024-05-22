// Import Hooks
import { useState, createContext } from "react"
import User from "../interfaces/User";

// Create Context
export const UserContext = createContext({});

/**
 * User Provider
 * @param {HTMLElement} children => Children element to display
 * @returns {HTMLElement} component html elements
 */
const UserProvider = ({ children }: {children: any}) => 
{
    // Set States
    const [user, setUser] = useState<User>();

    // Return html elements
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
/**
 * @file Sidebar.tsx
 * @description Sidebar component to display the sidebar of the application
 * @author Damien Loup
 */

// Import libraries
import { useContext } from "react";
import { NavLink } from "react-router-dom";

// Import contexts
import { UserContext } from "../../utils/contexts/UserContext";

// Import interfaces
import { IUserContext } from "../../utils/interfaces/IUser";

/**
 * Sidebar component to display the sidebar of the application
 * @param user => user connected
 * @param logout => logout function
 * @returns => Sidebar component
 */
function Sidebar()
{
    // Get user context
    const { actualUser, logout } = useContext<IUserContext>(UserContext as any);

    return (
        <aside className="bg-colorpalette-backgrounds-secondary min-w-60 flex flex-col">
            <div id="userProfile" className="flex py-4 pl-2 border-b-2 border-black">
                <div className="rounded-full bg-white h-[25px] w-[25px]"></div>
                <h2 className="pl-2 w-full">{actualUser ? actualUser.name : "no name"}</h2>
            </div>
            <nav className="font-bold flex-1">
                <ul className="relative h-full">
                    <li>
                        <NavLink className={({ isActive }) => `${isActive ? "bg-colorpalette-active" : ""} py-4 pl-2 block`} to={"/home"}><span>Home</span></NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `${isActive ? "bg-colorpalette-active" : ""} py-4 pl-2 block`} to={"/dashboard"}>Dashboard</NavLink>
                    </li>
                    {actualUser && actualUser.isBoss &&
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? "bg-colorpalette-active" : ""} py-4 pl-2 block`} to={"/orders"}>Orders</NavLink>
                        </li>
                    }
                    <li className="absolute inset-x-0 bottom-0">
                        <button id="btnLogout" onClick={() => logout()} className="w-full h-full text-left py-4 pl-2 bg-colorpalette-button-disconnect hover:bg-opacity-80">Logout</button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
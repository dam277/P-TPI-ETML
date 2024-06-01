/**
 * @file Main.tsx
 * @description Main component to display the main section of the application
 * @author Damien Loup
 */

// Import libraries
import { useLocation } from "react-router-dom";

/**
 * Main component to display the main section of the application
 * @param children => children to display in the main section
 * @returns => Main component
 */
function Main({ children }: {children: any}): JSX.Element
{
    // Get location
    const location = useLocation();

    // Return the main component
    return (
        <main className={`bg-colorpalette-backgrounds-primary text-colorpalette-texts-default min-h-screen ${location.pathname !== "/" && "flex"}`}>
            {children}
        </main>
    );
}

export default Main;
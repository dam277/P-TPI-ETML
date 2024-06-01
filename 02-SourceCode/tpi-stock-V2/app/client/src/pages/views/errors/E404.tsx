/**
 * @file E404.tsx
 * @description Displays the 404 error page
 * @author Damien Loup
 */

// Import includes
import Main from "../../includes/Main";

/**
 * Displays the 404 error page
 * @returns => E404 component
 */
function E404() 
{
    return (
        <Main>
            <div className="flex items-center justify-center w-full">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold">
                            404 - Not Found
                        </h2>
                        <p className="mt-2 text-center text-sm">
                            The page you are looking for does not exist.
                        </p>
                    </div>
                    <div className="mt-6">
                        <a href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-colorpalette-texts-default bg-colorpalette-button-color hover:bg-opacity-80">
                            Go back to login
                        </a>
                        <br />
                        <a href="/home" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-colorpalette-texts-default bg-colorpalette-button-color hover:bg-opacity-80">
                            Go back to home
                        </a>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default E404;
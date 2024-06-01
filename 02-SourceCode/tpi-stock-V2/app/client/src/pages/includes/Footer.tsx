/**
 * @file Footer.tsx
 * @descriptio Display the footer of the website
 * @author Damien Loup
 */

/**
 * Display the footer of the website
 * @returns => Footer component
 */
function Footer() 
{
    // Return the footer
    return (
        <footer className={`bg-black text-colorpalette-texts-default text-center`}>
            <span>Copyright ©2024 - Developed by Damien Loup</span>
        </footer>
    );
}

export default Footer;
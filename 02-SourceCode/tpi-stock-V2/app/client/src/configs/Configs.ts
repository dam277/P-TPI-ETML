/**
 * @file Configs.ts
 * @description Configs of the app
 * @author Damien Loup
 */

// Configs of the app
const Configs = 
{
    API_URL: process.env.REACT_APP_BACKEND_URL || ""        // URL of the backend API if frontend and backend are separated
};

export default Configs;
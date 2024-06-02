/**
 * @file Router.tsx
 * @description Manage the routes of the application
 * @author Damien Loup
 */

// Import libraries
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import Components
import Login from './pages/views/Login';
import Home from './pages/views/Home';
import Dashboard from './pages/views/Dashboard';
import Orders from './pages/views/Orders';
import E401 from './pages/views/errors/E401';
import E403 from './pages/views/errors/E403';
import E404 from './pages/views/errors/E404';

// Import Includes
import Main from './pages/includes/Main';
import Footer from './pages/includes/Footer';

// Import Contexts
import UserContext from './utils/contexts/UserContext';

/**
 * Manage the routes of the application
 * @returns => Router component
 */
function Router() 
{
    // Return the router
    return (
        <BrowserRouter>
            <UserContext>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path='*'element={<E404 />} />
                    <Route path='/401' element={<E401 />} />
                    <Route path='/403' element={<E403 />} />
                </Routes>
            </UserContext>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;
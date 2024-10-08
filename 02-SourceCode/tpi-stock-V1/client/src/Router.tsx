import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/views/Login';
import Home from './pages/views/Home';
import Dashboard from './pages/views/Dashboard';
import Orders from './pages/views/Orders';

import UserContext from './utils/contexts/UserContext';

import Main from './pages/includes/Main';
import Footer from './pages/includes/Footer';

function Router() 
{
    return (
        <BrowserRouter>
            <UserContext>
                <Main>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </Main>
            </UserContext>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;
import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import HeaderComponent from './components/Header';
import SidBar from "./components/SidBar";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import RecipyDetails from "./pages/RecipyDetails";
import SearchRecipy from "./pages/SearchRecipy";

const App = () => {
    const [sideBarToggled, setSideBarToggled] = useState(false);

    const toggleSideBar = () => {
        setSideBarToggled((prev) => !prev);
    };

    return (
        <div className={sideBarToggled ? 'toggle-sidebar' : ''}>
            <Router>
                <AppContent toggleSideBar={toggleSideBar} sideBarToggled={sideBarToggled}/>
            </Router>
        </div>
    );
};

const AppContent: React.FC<AppContentProps> = ({toggleSideBar}) => {
    const location = useLocation();

    const shouldDisplayHeaderAndSidebar = () => {
        const {pathname} = location;
        const allowedURLs = ['/', '/search', "/product-details", '/recipy-details'];
        return allowedURLs.includes(pathname);
    };

    return (
        <>
            {shouldDisplayHeaderAndSidebar() && (
                <>
                    <HeaderComponent change={toggleSideBar}/>
                    <SidBar/>
                </>
            )}
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<SearchRecipy/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/recipy-details" element={<RecipyDetails/>}/>
                <Route path="/search" element={<SearchRecipy/>}/>


                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </>
    );
};

interface AppContentProps {
    toggleSideBar: () => void;
    sideBarToggled: boolean;
}

export default App;

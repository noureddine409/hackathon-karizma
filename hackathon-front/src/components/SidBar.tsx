import React from 'react';
import {Link} from "react-router-dom"

const SideBarComponent = () => {
    return (
        <aside id="sidebar"
               className="sidebar"
        >
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link collapsed">
                        <i className="bi bi-grid"/>
                        <span>My Recipies</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="search" className="nav-link collapsed">
                        <i className="bi bi-grid"/>
                        <span>search recipies</span>
                    </Link>
                </li>

            </ul>
        </aside>
    );
}

export default SideBarComponent;

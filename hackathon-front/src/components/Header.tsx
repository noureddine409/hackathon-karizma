import React from 'react';
import {Link, useNavigate} from "react-router-dom"

interface HeaderProps {
    change: () => void;
}
const HeaderComponent = ({change}: HeaderProps) => {

    const navigate = useNavigate()

    const handleChange = () => {
        change();
    }

    const handleLogout = () => {

    }

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logo d-flex align-items-center">
                    <img src="https://karizma-group.com/wp-content/uploads/2023/01/nos-clients-karizma-group-1.png" alt=""/>
                    <span className="d-none d-lg-block">Karizma</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn" onClick={handleChange}/>
            </div>
            {/* End Logo */}
            <div className="search-bar">
                <form
                    className="search-form d-flex align-items-center"
                >
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        title="Enter search keyword"
                    />
                    <button type="submit" title="Search">
                        <i className="bi bi-search"/>
                    </button>
                </form>
            </div>
            {/* End Search Bar */}
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item d-block d-lg-none">
                        <div className="nav-link nav-icon search-bar-toggle ">
                            <i className="bi bi-search"/>
                        </div>
                    </li>
                    {/* End Search Icon*/}
                    <li className="nav-item dropdown">
                        <a className="nav-link nav-icon" href="/#" data-bs-toggle="dropdown">
                            <i className="bi bi-bell"/>
                            <span className="badge bg-primary badge-number">4</span>
                        </a>
                        {/* End Notification Icon */}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                            <li className="dropdown-header">
                                You have 4 new notifications
                                <a href="/#">
                <span className="badge rounded-pill bg-primary p-2 ms-2">
                  View all
                </span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item">
                                <i className="bi bi-exclamation-circle text-warning"/>
                                <div>
                                    <h4>Lorem Ipsum</h4>
                                    <p>Quae dolorem earum veritatis oditseno</p>
                                    <p>30 min. ago</p>
                                </div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item">
                                <i className="bi bi-x-circle text-danger"/>
                                <div>
                                    <h4>Atque rerum nesciunt</h4>
                                    <p>Quae dolorem earum veritatis oditseno</p>
                                    <p>1 hr. ago</p>
                                </div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item">
                                <i className="bi bi-check-circle text-success"/>
                                <div>
                                    <h4>Sit rerum fuga</h4>
                                    <p>Quae dolorem earum veritatis oditseno</p>
                                    <p>2 hrs. ago</p>
                                </div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item">
                                <i className="bi bi-info-circle text-primary"/>
                                <div>
                                    <h4>Dicta reprehenderit</h4>
                                    <p>Quae dolorem earum veritatis oditseno</p>
                                    <p>4 hrs. ago</p>
                                </div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="dropdown-footer">
                                <a href="/#">Show all notifications</a>
                            </li>
                        </ul>
                        {/* End Notification Dropdown Items */}
                    </li>
                    {/* End Notification Nav */}
                    <li className="nav-item dropdown">

                        {/* End Messages Icon */}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                            <li className="dropdown-header">
                                You have 3 new messages
                                <a href="/#">
                <span className="badge rounded-pill bg-primary p-2 ms-2">
                  View all
                </span>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="message-item">
                                <a href="/#">
                                    <img
                                        alt=""
                                        className="rounded-circle"
                                    />
                                    <div>
                                        <h4>Maria Hudson</h4>
                                        <p>
                                            Velit asperiores et ducimus soluta repudiandae labore
                                            officia est ut...
                                        </p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="message-item">
                                <a href="/#">
                                    <img
                                        alt=""
                                        className="rounded-circle"
                                    />
                                    <div>
                                        <h4>Anna Nelson</h4>
                                        <p>
                                            Velit asperiores et ducimus soluta repudiandae labore
                                            officia est ut...
                                        </p>
                                        <p>6 hrs. ago</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="message-item">
                                <a href="/#">
                                    <img
                                        alt=""
                                        className="rounded-circle"
                                    />
                                    <div>
                                        <h4>David Muldon</h4>
                                        <p>
                                            Velit asperiores et ducimus soluta repudiandae labore
                                            officia est ut...
                                        </p>
                                        <p>8 hrs. ago</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="dropdown-footer">
                                <a href="/#">Show all messages</a>
                            </li>
                        </ul>
                        {/* End Messages Dropdown Items */}
                    </li>
                    {/* End Messages Nav */}
                    <li className="nav-item dropdown pe-3">
                        <a
                            className="nav-link nav-profile d-flex align-items-center pe-0"
                            href="/#"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                alt="Profile"
                                className="rounded-circle"
                                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                            />
                            <span className="d-none d-md-block dropdown-toggle ps-2">
              {/*{auth.authenticatedUser?.firstName} {auth.authenticatedUser?.lastName}*/}
                                User user
            </span>
                        </a>
                        {/* End Profile Iamge Icon */}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                {/*<h6>{auth.authenticatedUser?.firstName} {auth.authenticatedUser?.lastName} </h6>*/}
                                <h6>user user</h6>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item d-flex align-items-center"
                                    to="/profile"
                                >
                                    <i className="bi bi-person"/>
                                    <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item d-flex align-items-center"
                                    to="/profile"
                                >
                                    <i className="bi bi-gear"/>
                                    <span>Account Settings</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item d-flex align-items-center"
                                    to="f-a-q"
                                >
                                    <i className="bi bi-question-circle"/>
                                    <span>Need Help?</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <div className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"/>
                                    <span>Sign Out</span>
                                </div>
                            </li>
                        </ul>
                        {/* End Profile Dropdown Items */}
                    </li>
                    {/* End Profile Nav */}
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComponent;

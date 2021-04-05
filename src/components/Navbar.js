import React from 'react'
import { useAuthState } from './../context/auth';
import { useAuthDispatch } from './../context/auth';
import FeatherIcon from 'feather-icons-react';

export default function Navbar(props) {
    const { user } = useAuthState();

    console.log(user);
    
    const dispatch = useAuthDispatch();

    const logout = () => {
        dispatch({ type:'LOGOUT' });
        window.location.href = '/login';
    }

    if(user){
    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle d-flex">
                <i className="hamburger align-self-center"></i>
            </a>

            

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-toggle="dropdown">
                            <div className="position-relative">
                                <FeatherIcon icon="bell" />
                                <span className="indicator">4</span>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="alertsDropdown">
                            <div className="dropdown-menu-header">
                                4 New Notifications
                            </div>
                            <div className="list-group">
                                <a href="#" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <FeatherIcon className="text-danger" icon="alert-circle" />
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Update completed</div>
                                            <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                                            <div className="text-muted small mt-1">30m ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <FeatherIcon className="text-warning" icon="bell" />
                                            
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Lorem ipsum</div>
                                            <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                                            <div className="text-muted small mt-1">2h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <FeatherIcon className="text-primary" icon="home" />
                                            
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">Login from 192.186.1.8</div>
                                            <div className="text-muted small mt-1">5h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="list-group-item">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-2">
                                            <FeatherIcon className="text-success" icon="user-plus" />
                                        </div>
                                        <div className="col-10">
                                            <div className="text-dark">New connection</div>
                                            <div className="text-muted small mt-1">Christina accepted your request.</div>
                                            <div className="text-muted small mt-1">14h ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all notifications</a>
                            </div>
                        </div>
                    </li>
                   
                    <li className="nav-item dropdown">

                        <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-toggle="dropdown">
                            <FeatherIcon className="align-middle" icon="settings" />
                        </a>

                        <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-toggle="dropdown">
                            <img src={user.payload.image === null || user.payload === undefined ? "img/photos/user-01.png" : `http://localhost:4000/img/utilisateurs/${user.payload.image}`} className="avatar img-fluid rounded mr-1" alt="user" /> <span className="text-dark">{ user.payload.nom+" "+user.payload.prenom }</span>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="/Profile"><FeatherIcon className="align-middle mr-1" icon="user" /> Profile</a>
                          
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/settings"><FeatherIcon className="align-middle mr-1" icon="settings" /> Settings & Privacy</a>
                          
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item" style={{ "cursor": "pointer" }} onClick={logout}><FeatherIcon className="align-middle mr-1" icon="log-out" /> Log out</span>
                        </div>

                    </li>
                </ul>
            </div>
        </nav>
    ) } else {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

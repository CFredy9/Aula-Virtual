import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../../../../../assets/styles/Sidebar.css'

class SideBarCatedratico extends Component {
    constructor(props) {
        super(props);
        this.state = {dropdownOpen: false};
    }
    toggle = () => {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    };
    render() {
        const { toggleOpen, navToggle,  logOut, user } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-lg-2 ${toggleOpen?'':'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar nav-item">
                       
                        <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}>
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">home</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>
                       
                        <li>
                        
                        </li> 
                        <li className="nav-item">
                                    <NavLink to="/miscursos" className="nav-link" activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">vertical_split</i>
                                        </div>
                                        <span>Mis Cursos</span>
                                    </NavLink>
                        </li>

                        <li>
                        <nav className="nav-item">
                            <Dropdown className="dropdown-menu-small" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle color="red" caret className="nav--no-borders flex-column nav">
                                <li  exact className="nav-link " activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">reorder</i>
                                        </div>
                                        <span>Estadísticas</span>
                                    </li>
                                </DropdownToggle>
                                <DropdownMenu>
                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/tareaspendientescalificar" className="nav-link" activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">vertical_split</i>
                                            </div>
                                            <span>Tareas Pendientes</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>

                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/tareascalificadas" className="nav-link" activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">vertical_split</i>
                                            </div>
                                            <span>Tareas Calificadas</span>
                                        </NavLink>
                                    </li> 
                                </Dropdown>

                                </DropdownMenu>
                            </Dropdown>
                        <nav className="nav">
                            <a  className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center"
                                onClick={ navToggle } >
                                <i className="material-icons"></i>
                            </a>
                        </nav>
                    </nav>
                </li> 
                <li className="nav-item">
                                    <NavLink to="/controlnotas" className="nav-link" activeClassName={'active'}>
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">vertical_split</i>
                                        </div>
                                        <span>Control de Notas</span>
                                    </NavLink>
                        </li>

               
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBarCatedratico;
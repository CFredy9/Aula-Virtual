import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../../../../../assets/styles/Sidebar.css'

class SideBar extends Component {
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
                       
                        <a  className="toggle-sidebar d-md-none d-lg-none"
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
                                <span className="text-light font-weight-bold mb-0">Home</span>
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
                                        <span>Registro</span>
                                    </li>
                                </DropdownToggle>
                                <DropdownMenu>
                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/catedratico" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">account_circle</i>
                                            </div>
                                            <span>Catedratico</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>

                                <Dropdown>
                                    <li className="nav-item">
                                        <NavLink to="/estudiante" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">account_circle</i>
                                            </div>
                                            <span>Estudiante</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>

                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/ciclo_escolar" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">content_paste</i>
                                            </div>
                                            <span>Ciclo Escolar</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>

                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/nivel" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">content_paste</i>
                                            </div>
                                            <span>Nivel</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>

                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/grado" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">content_paste</i>
                                            </div>
                                            <span>Grado</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>

                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/seccion" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">content_paste</i>
                                            </div>
                                            <span>Seccion</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>
                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/curso" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">assignment</i>
                                            </div>
                                            <span>Curso</span>
                                        </NavLink>
                                    </li>
                                </Dropdown>
                                <Dropdown >
                                    <li className="nav-item">
                                        <NavLink to="/profesion" exact className="nav-link " activeClassName={'active'}>
                                            <div className="d-inline-block item-icon-wrapper">
                                                <i className="material-icons">work</i>
                                            </div>
                                            <span>Profesión</span>
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
                            <NavLink to="/asignacion_curso" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Asignación Curso</span>
                            </NavLink>
                 </li>

                 <li className="nav-item">
                            <NavLink to="/estadisticas" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Estadisticas</span>
                            </NavLink>
                 </li>
                {/*  <li className="nav-item">
                            <NavLink to="/miscursos" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Mis Cursos</span>
                            </NavLink>
                 </li> 

                 <li className="nav-item">
                            <NavLink to="/miscursosest" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Cursos Asignados</span>
                            </NavLink>
                 </li> */}
               
                {/* 
                        <li className="nav-item">
                            <NavLink to="/page2" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Basic components</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/grids" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Grids</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/notifications" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Notificaciones</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tabs" className="nav-link" activeClassName={'active'}>
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Tabs</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                     */} 
                    </ul>
                </div>
            </aside>
        )
    }
}

export default SideBar;

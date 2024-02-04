import {Link,useLocation  } from 'react-router-dom'
import AuthUser from '../Auth/AuthUser';
import { useEffect } from 'react';


const Sidebar = () => {

  const currentPath = useLocation();

  const {authUser} = AuthUser();
  const hasAllPermissions = (requiredPermissions) =>
  requiredPermissions.every((permission) => authUser.permissions.includes(permission));
  const hasAnyPermission = (requiredPermissions) =>
  requiredPermissions.some((permission) => authUser.permissions.includes(permission));


    return (
        <>
           <div className="main-sidebar sidebar-style-2">
            <aside id="sidebar-wrapper">
              <div className="sidebar-brand">
                <Link to="/"> <img alt="image" src="/assets/img/logo.png" className="header-logo" /> <span
                    className="logo-name">ICPL</span>
                </Link>
              </div>
              <ul className="sidebar-menu">
                <li className="menu-header">Main</li>

                {/* {hasAnyPermission(['role-lists', 'users-lists']) ? (
                <li className={hasAnyPermission(['role-list', 'users-list']) ? 'dropdown active' : 'dropdown'}>
                    <Link to="/" className="nav-link">
                      <i className="fas fa-desktop"></i>
                      <span>Test</span>
                    </Link>
                  </li>
                 ) : (
                  // Optional: Content to show when the user does not have the required permissions
                  ''
                )} */}

            {/* {hasAllPermissions(['dashboard_view']) ? (
                <li className={currentPath.pathname  === '/' || currentPath.pathname  === '/dashboard'  ? 'dropdown active' : 'dropdown'}>
             
                </li>
            ) : (
              ''
            )} */}

            {/* {hasAnyPermission(['dashboard_view']) ? (
                <li className={currentPath.pathname  === '/' || currentPath.pathname  === '/dashboard'  ? 'dropdown active' : 'dropdown'}>
                    
                </li>
            ) : (
              ''
            )} */}
            

            {hasAnyPermission(['dashboard_view']) ? (
                <li className={currentPath.pathname === '/' || currentPath.pathname  === '/dashboard'  ? 'dropdown active' : 'dropdown'}>
                <Link to="/" className="nav-link">
                <i class="fas fa-desktop"></i>
                <span>Dashboard</span></Link>
              </li>
            ) : (
              ''
            )}
         
          
            {hasAnyPermission(['users-list','user-create','users-edit','users-delete']) ? (
                <li className={currentPath.pathname === '/users-list' || currentPath.pathname  === '/user-create'  ? 'dropdown active' : 'dropdown'}>
                <Link to="/users-list" className="nav-link">
                <i className="far fa-user"></i>
                <span>Users</span></Link>
              </li>
            ) : (
              ''
            )}

            {hasAnyPermission(['role-list','role-create','role-edit','role-delete']) ? (
                <li className={currentPath.pathname === '/role-list' || currentPath.pathname  === '/role-create'  ? 'dropdown active' : 'dropdown'}>
                <Link to="/role-list" className="nav-link">
                <i class="fas fa-users-cog"></i>
                <span>Roles</span></Link>
              </li>
            ) : (
              ''
            )}


          {hasAnyPermission(['branch-list','branch-create','branch-edit','branch-delete']) ? (
                <li className={currentPath.pathname === '/branch-create' || currentPath.pathname  === '/branch-list' || currentPath.pathname  === '/branch-edit'  ? 'dropdown active' : 'dropdown'}>
                <Link to="/branch-list" className="nav-link">
                <i class="fas fa-building"></i>
                <span>Company Branch</span></Link>
              </li>
            ) : (
              ''
            )}


          {hasAnyPermission(['account-list','account-create','account-edit','account-delete']) ? (
                <li className={currentPath.pathname === '/account-list' || currentPath.pathname  === '/account-create' || currentPath.pathname  === '/account-edit' || currentPath.pathname  === '/ledger-create' || currentPath.pathname  === '/financial-year-create' || currentPath.pathname  === '/journal-entry' ? 'dropdown active' : 'dropdown'}>
                <Link to="/account-list" className="nav-link">
                <i class="fas fa-user-alt"></i>
                <span>Accounts</span></Link>
              </li>
            ) : (
              ''
            )}
               

                {/* <li className={currentPath.pathname === '/user-list' || currentPath.pathname  === '/user-create'  ? 'dropdown active' : 'dropdown'}>
                  <Link to="/user-list" className="nav-link">
                  <i className="far fa-user"></i>
                  <span>Users</span></Link>
                </li> */}

                
                <li className={currentPath.pathname === '/projectPyments' || currentPath.pathname  === '/projectPyments2'  ? 'dropdown active' : 'dropdown'}>
                  <Link to="/projectPyments" className="menu-toggle nav-link has-dropdown">
                  <i className="fas fa-tasks"></i>
                  <span>Project</span></Link>
                  <ul className="dropdown-menu">
                    <li> <Link to="/projectPyments" className={currentPath.pathname  === '/projectPyments' ? 'nav-link active' : 'nav-link'}>Project</Link></li>
                    <li> <Link to="/projectPyments2" className="nav-link">Project 2</Link></li>
                    <li> <Link to="/register" className="nav-link">Register</Link></li>
                  </ul>
                </li>


                <li className="dropdown">
                  <a href="src/components#" className="menu-toggle nav-link has-dropdown"><i className="far fa-smile"></i><span>Apps</span></a>
                  <ul className="dropdown-menu">
                    <li><a className="nav-link" href="chat.html">Chat</a></li>
                    <li><a className="nav-link" href="portfolio.html">Portfolio</a></li>
                    <li><a className="nav-link" href="blog.html">Blog</a></li>
                    <li><a className="nav-link" href="calendar.html">Calendar</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="src/components#" className="menu-toggle nav-link has-dropdown"><i className="far fa-envelope"></i><span>Email</span></a>
                  <ul className="dropdown-menu">
                    <li><a className="nav-link" href="email-inbox.html">Inbox</a></li>
                    <li><a className="nav-link" href="email-compose.html">Compose</a></li>
                    <li><a className="nav-link" href="email-read.html">read</a></li>
                  </ul>
                </li>
                <li className="menu-header">UI Elements</li>
                <li className="dropdown">
                  <a href="src/components#" className="menu-toggle nav-link has-dropdown"><i className="far fa-copy"></i><span>Basic
                      Components</span></a>
                  <ul className="dropdown-menu">
                    <li><a className="nav-link" href="alert.html">Alert</a></li>
                    <li><a className="nav-link" href="badge.html">Badge</a></li>
                    <li><a className="nav-link" href="breadcrumb.html">Breadcrumb</a></li>
                    <li><a className="nav-link" href="buttons.html">Buttons</a></li>
                    <li><a className="nav-link" href="collapse.html">Collapse</a></li>
                    <li><a className="nav-link" href="dropdown.html">Dropdown</a></li>
                    <li><a className="nav-link" href="checkbox-and-radio.html">Checkbox &amp; Radios</a></li>
                    <li><a className="nav-link" href="list-group.html">List Group</a></li>
                    <li><a className="nav-link" href="media-object.html">Media Object</a></li>
                    <li><a className="nav-link" href="navbar.html">Navbar</a></li>
                    <li><a className="nav-link" href="pagination.html">Pagination</a></li>
                    <li><a className="nav-link" href="popover.html">Popover</a></li>
                    <li><a className="nav-link" href="progress.html">Progress</a></li>
                    <li><a className="nav-link" href="tooltip.html">Tooltip</a></li>
                    <li><a className="nav-link" href="flags.html">Flag</a></li>
                    <li><a className="nav-link" href="typography.html">Typography</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="src/components#" className="menu-toggle nav-link has-dropdown"><i className="far fa-address-card"></i><span>Advanced</span></a>
                  <ul className="dropdown-menu">
                    <li><a className="nav-link" href="avatar.html">Avatar</a></li>
                    <li><a className="nav-link" href="card.html">Card</a></li>
                    <li><a className="nav-link" href="modal.html">Modal</a></li>
                    <li><a className="nav-link" href="sweet-alert.html">Sweet Alert</a></li>
                    <li><a className="nav-link" href="toastr.html">Toastr</a></li>
                    <li><a className="nav-link" href="empty-state.html">Empty State</a></li>
                    <li><a className="nav-link" href="multiple-upload.html">Multiple Upload</a></li>
                    <li><a className="nav-link" href="pricing.html">Pricing</a></li>
                    <li><a className="nav-link" href="tabs.html">Tab</a></li>
                  </ul>
                </li>
                <li><a className="nav-link" href="blank.html"><i className="fas fa-ban"></i><span>Blank Page</span></a></li>

              </ul>
            </aside>
          </div>
        </>
    );
}

export default Sidebar;
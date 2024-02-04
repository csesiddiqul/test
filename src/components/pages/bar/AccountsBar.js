import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthUser from '../../backend/Auth/AuthUser';

const AccountBar = ({ id }) => {
    const { authUser } = AuthUser();
    const currentPath = useLocation();

    const hasAllPermissions = (requiredPermissions) =>
    requiredPermissions.every((permission) => authUser.permissions.includes(permission));

    const hasAnyPermission = (requiredPermissions) =>
    requiredPermissions.some((permission) => authUser.permissions.includes(permission));
    
    return (
    <div className="card card-primary pb-2">
        <div className="padding-10">
        <ul className="nav nav-tabs" id="myTab2" role="tablist">
            {hasAnyPermission(['account-list']) && (
               <li className="nav-item">
                  <Link to='/account-list' className={`mx-1 nav-link ${ currentPath.pathname=== '/account-list' || currentPath.pathname==='/account-create' || currentPath.pathname==='/account-edit/'+id || currentPath.pathname==='/ledger-create' ? 'active' : ''}`}>
                      Account List
                  </Link>
              </li>
            )}
            {hasAnyPermission(['financial-year-create']) && (
               <li className="nav-item">
                  <Link to='/financial-year-create' className={`mx-1 nav-link ${ currentPath.pathname=== '/financial-year-create'  ? 'active' : ''}`}>
                    Financial Year 
                  </Link>
              </li>
            )}
            
          {hasAnyPermission(['journal-entry']) && (
               <li className="nav-item">
                  <Link to='/journal-entry' className={`mx-1 nav-link ${ currentPath.pathname=== '/journal-entry'  ? 'active' : ''}`}>
                    Journal Entry
                  </Link>
              </li>
            )}




        </ul>
        </div>
  </div>
  );
};

export default AccountBar;

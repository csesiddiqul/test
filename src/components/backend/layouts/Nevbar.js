import { Link } from "react-router-dom";
import AuthUser from "../Auth/AuthUser";

const Navbar = () =>{
  const {token , logout , user} = AuthUser();
  const logoutUser = () =>{
    if(token !== undefined){
      logout();
    }
  }
    return (
        <>
        <div className="navbar-bg"></div>
          <nav className="navbar navbar-expand-lg main-navbar sticky">
            <div className="form-inline mr-auto">
              <ul className="navbar-nav mr-3">
                
                
                  {/* <li>
                  <Link to="/" className="nav-link nav-link-lg fullscreen-btn">
                    <i data-feather="maximize"></i> 
                  </Link>
                  </li> */}
                <li>
                  <form className="form-inline mr-auto">
                    <div className="search-element">
                      <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200"/>
                      <button className="btn" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                </li>

                <li><Link to="/" data-toggle="sidebar" className="nav-link nav-link-lg
                      collapse-btn text-muted"> <i class="fas fa-bars"></i>
                      
                      </Link>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav navbar-right">
             
              <li className="dropdown"><a href="src/components#" data-toggle="dropdown"
                                          className="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="/assets/img/user.png"
                    className="user-img-radious-style"/> <span className="d-sm-none d-lg-inline-block"></span></a>

                    
                <div className="dropdown-menu dropdown-menu-right pullDown" style={{marginLeft: -150}}>
                  <div className="dropdown-title">Hello Sarah {user.name}</div>
                  <Link to="/profile" className="dropdown-item has-icon"> <i className="far
                        fa-user"></i> Profile
                  </Link> <a href="timeline.html" className="dropdown-item has-icon"> <i className="fas fa-bolt"></i>
                    Activities
                  </a> <a href="src/components#" className="dropdown-item has-icon"> <i className="fas fa-cog"></i>
                    Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <a  onClick={logoutUser} className="dropdown-item has-icon text-danger"> <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </>
    );
}
export default Navbar;
import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Cyberbugs
          </a>
          
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/home" activeClassName="bg-white text-dark">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/contact" activeClassName="bg-white text-dark">
                Contact <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/login" activeClassName="bg-white text-dark">
                  Login <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/logincyberbugs" activeClassName="bg-white text-dark">
                  Login Cyberbugs<span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/signup" activeClassName="bg-white text-dark">
                  Sign Up Cyberbugs <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              
            
            </ul>
         
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;











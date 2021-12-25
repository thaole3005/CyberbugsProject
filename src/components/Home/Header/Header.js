import React from "react";
import {NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { LOG_OUT_SAGA } from "../../../redux/constants/Cyberbugs/UserConst";
import { useDispatch } from 'react-redux';


export default function Header() {

  const {userLogin} = useSelector(state => state.UserCyberbugsReducer);
  const dispatch = useDispatch();


  return (
    <div className="header_container">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <NavLink className="navbar-brand" to="/">
            Cyberbugs
          </NavLink>
          
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/home" activeClassName="bg-white text-dark">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/projectmanagement" activeClassName="bg-white text-dark">
                ProjectManagement <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link active" to="/login" activeClassName="bg-white text-dark">
                  Login <span className="sr-only">(current)</span>
                </NavLink>
              </li> */}

              {
                Object.keys(userLogin).length === 0 ?
                  <li className="nav-item">
                  <NavLink className="nav-link active" to="/logincyberbugs" activeClassName="bg-white text-dark">
                    Login Cyberbugs<span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                :
                <li className="nav-item">
                <span className="nav-link active" style={{cursor: "pointer" }}
                onClick = {() => {
                  dispatch({
                    type: LOG_OUT_SAGA,
                  })
                }}
                >
                  Đăng xuất
                  <span className="sr-only">(current)</span>
                </span>
              </li>
              }

              {/* // <li className="nav-item">
              //   <NavLink className="nav-link active" to="/logincyberbugs" activeClassName="bg-white text-dark">
              //     Login Cyberbugs<span className="sr-only">(current)</span>
              //   </NavLink>
              // </li> */}
              <li className="nav-item">
                <NavLink className="nav-link active" to="/signup" activeClassName="bg-white text-dark">
                  Sign Up Cyberbugs <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              
            
            </ul>
         
          </div>
        </nav>
      </div>
  )
}











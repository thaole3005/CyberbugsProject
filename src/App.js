import React, {useState, useEffect} from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Route, Switch, Router, useHistory} from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Contact from './pages/Contact/Contact';
import UserLoginTemplate from './templates/UserLoginTemplate/UserLoginTemplate';
import LoginCyberbugs from './pages/Cyberbugs/LoginCyberbugs/LoginCyberbugs';
import LoadingComponent from './components/globalSetting/LoadindComponent/LoadingComponent';
import { ADD_HISTORY } from './redux/constants/HistoryConst';
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import IndexCyberBugs from './pages/Cyberbugs/ProjectDetail/IndexCyberBugs';

function App() {

  const dispatch = useDispatch();

  //?ta sử dụng hook useHistory tại App component => BrowserRouter phải bọc đc App component thì history mới có giá trị
  const history = useHistory();

  useEffect(() => {
    // console.log("history", history);
    //mới vào trang web thì dispatch history của hook useHistory lên HistoryReducer, component nào cần xài để chuyển trang thì lấy về
    dispatch({
      type: ADD_HISTORY,
      history: history
    })
    return () => {

    }
  }, [])


  return (
   
    <>
    <LoadingComponent/>
      <Switch>
        
          <HomeTemplate exact path = "/" Component={Home}/>
          <HomeTemplate exact path = "/home" Component={Home}/>
          <HomeTemplate exact path = "/contact" Component={Contact}/>
          <UserLoginTemplate exact path = "/login" Component={Login}/>
          <UserLoginTemplate exact path = "/logincyberbugs" Component={LoginCyberbugs}/>
          <UserLoginTemplate exact path = "/signup" Component={Signup}/>
          

          <CyberbugsTemplate exact path = "/cyberbugs" Component={IndexCyberBugs}/>

      </Switch>
      </>
   
  );
}

export default App;

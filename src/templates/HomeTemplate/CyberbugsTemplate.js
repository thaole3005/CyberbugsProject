import React from 'react';
import { Route } from 'react-router-dom';
import '../../index.css';
import SidebarCyberbugs from './../../components/Cyberbugs/Main/SidebarCyberbugs';
import MenuCyberbugs from './../../components/Cyberbugs/MenuCyberbugs';
import '../../index.css';





export const CyberbugsTemplate = (props) => {
    const {Component, ...restParam} = props;
    return <Route {...restParam} render = {(propsRoute) => {
        return <>
          
            <div className="jira">
               
                    <SidebarCyberbugs/>
                    <MenuCyberbugs/>
                    <Component {...propsRoute}/>
            </div>
        </>
    }}
    
    />
}
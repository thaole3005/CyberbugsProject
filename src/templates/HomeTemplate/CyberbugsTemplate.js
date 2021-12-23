import React from 'react';
import { Route } from 'react-router-dom';
import '../../index.css';
import SidebarCyberbugs from './../../components/Cyberbugs/Main/SidebarCyberbugs';
import MenuCyberbugs from './../../components/Cyberbugs/MenuCyberbugs';
import '../../index.css';
import ModalCyberbugs from './../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs';
import Header from './../../components/Home/Header/Header';





export const CyberbugsTemplate = (props) => {
    const {Component, ...restParam} = props;
    return <Route {...restParam} render = {(propsRoute) => {
        // console.log("render CyberbugsTemplate")
        return <>
          
            <div className="jira">
                    <Header/>
                    <SidebarCyberbugs/>
                    <MenuCyberbugs/>
                    <Component {...propsRoute} className="mt-2"/>
                    <ModalCyberbugs/>
            </div>
        </>
    }}
    
    />
}
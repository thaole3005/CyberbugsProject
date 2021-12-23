import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarsOutlined ,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { OPEN_FORM_CREATE_TASK } from './../../../redux/constants/Cyberbugs/DrawConst/DrawConst';
import FormCreateTask from './../../Form/FormCreateTask';


const { Header, Sider, Content } = Layout;

export default function SidebarCyberbugs() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const dispatch = useDispatch();

  return (
    <div> 
      <Sider trigger={null} collapsible collapsed={state.collapsed} style = {{height: '100%',}} className="mt-3">
        <div className="text-right text-white p-2" onClick = {toggle} style ={{cursor: 'pointer', fontSize: '25px',}}><BarsOutlined /></div>
        <div className="logo" />
 
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlusOutlined style ={{cursor: 'pointer', fontSize: '20px',}}/>} onClick = {() => {
            dispatch({
              type: OPEN_FORM_CREATE_TASK,
              title: "Create New Task",
              Component: <FormCreateTask/>,
            })
          }}>
            Create Task
          </Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined style ={{cursor: 'pointer', fontSize: '20px',}}/>} >
            Search
          </Menu.Item>
          
        </Menu>
      </Sider>
    </div>
  );
}

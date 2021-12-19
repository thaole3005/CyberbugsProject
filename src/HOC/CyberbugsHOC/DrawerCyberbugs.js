import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { OPEN_DRAWER, CLOSE_DRAWER } from './../../redux/constants/Cyberbugs/DrawConst/DrawConst';

const { Option } = Select;

export default function DrawerCyberbugs(props) {

  const dispatch = useDispatch();
    
    //lấy các giá trị từ redũstore của DrawerReducer về
    const {visible, title, ComponentContentDrawer, callBackSubmit} = useSelector(state => state.DrawerReducer);

    const showDrawer = () => {
      dispatch({
        type: OPEN_DRAWER,
      })
    };
  
    const onClose = () => {
      dispatch({
        type: CLOSE_DRAWER,
      })
    };

    // console.log("RENDER DrawerCyberbugs");
    return (
        <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Show Drawer
        </Button>
        <Drawer
          title= {title}
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={callBackSubmit} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          
          {/* Nội dung thay đổi của Drawer */}
          {ComponentContentDrawer}
        </Drawer>
      </>
    )
}

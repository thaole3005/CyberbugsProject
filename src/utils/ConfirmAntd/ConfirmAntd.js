import React from 'react';
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export function showConfirm(title, contentComponent, callBackConfirm, cancelText, okText, callBackCancel = () => {
  console.log("cancel")
}) {
    console.log("vào hàm showConfirm");
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: contentComponent,
      okText: okText,
      cancelText: cancelText,
      onOk() {
        callBackConfirm();
      },
      onCancel() {
        callBackCancel();
      },
    });
  }
  


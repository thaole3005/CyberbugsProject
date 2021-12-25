import React from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { USER_SIGNUP_SAGA } from '../../redux/constants/Cyberbugs/UserConst';


const { Option } = Select;



const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
// Phải có chữ hoa, phải có chữ thương, phải có số, tối thiểu phải 8 ký tự
const validEmail =
// eslint-disable-next-line no-useless-escape
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validPhone =
/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;



export default function Signup() {

    const dispatch = useDispatch();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );


    const onFinish = (values) => {
        console.log('Success:', values);
        let action = {
            type: USER_SIGNUP_SAGA,
            userSignUp: {
                "email": values.email,
                "passWord": values.passWord,
                "name": values.name,
                "phoneNumber": values.phoneNumber,
            }
            
        }
        dispatch(action);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <h2>Sign Up</h2>
            <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
            validator: async (rule, value) => {
                if (value && value.match(validEmail)) {
                    return Promise.resolve();
                  }
  
                  return Promise.reject();
              }
          },
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
          name="passWord"
          label="Password"
          rules={[
            {
              required: true,
              min: 8,
              message: "Mật khẩu tối thiểu 6 kí tự, gồm chữ hoa chữ thường và số!",
            },
            () => ({
              validator(_, value) {
                if (value && value.match(validPassword)) {
                  return Promise.resolve();
                }

                return Promise.reject();
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Please input your password" />
        </Form.Item>


      <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              min: 1,
              message: "Please input your name!",
            },
          
          ]}
          hasFeedback
        >
          <Input placeholder="Please input your name" />
        </Form.Item>


      {/* <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              min: 8,
              message: "Please input your Phone Number!",
            },
            () => ({
              validator(_, value) {
                if (value && value.match(validPassword)) {
                  return Promise.resolve();
                }

                return Promise.reject();
              },
            }),
          ]}
          hasFeedback
        >
          <Input placeholder="Please input your Phone Number" />
        </Form.Item> */}


<Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            () => ({
              validator(_, value) {
                if (!value || value.match(validPhone)) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(
                    "The two phone number that you entered do not match!"
                  )
                );
              },
            }),
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
            placeholder="Please input your phone number"
          />
        </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

        </div>
    )
}

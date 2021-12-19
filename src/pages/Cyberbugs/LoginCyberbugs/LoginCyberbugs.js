import React from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import {withFormik, Form} from 'formik';
import * as Yup from "yup";
import {connect} from 'react-redux';
import { USER_SIGNIN_CYBERBUGS_SAGA } from '../../../redux/constants/Cyberbugs/UserConst';


function LoginCyberbugs(props) {

//    console.log("new props of HOC LoginCyberbugsWithFormik", props);
   const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
//   console.log("values in LoginCyberbugs khi handleChange input", values);

    return (
        <div className="container">
            <form onSubmit = {handleSubmit} className=" d-flex flex-column justify-content-center align-items-center" style = {{height: window.innerHeight,}}>
                <h3 className="text-center">Login CyberBugs</h3>
                <Input name = "email" size = "large" placeholder="enter your email" prefix={<UserOutlined />}
                onChange={handleChange}
                />
                <div className="text-danger">{errors.email}</div>


                <Input type="password" name = "password" size = "large" placeholder="enter your password" prefix={<LockOutlined />} className="mt-4"
                onChange={handleChange}/>   
                <div className="text-danger">{errors.password}</div>

                

                <Button htmlType = "submit" size = "large" className = "mt-5 w-50 text-center"
                 style = {{backgroundColor: 'rgb(131,199,93)', color: 'white'}}
                //  onClick={handleSubmit}
                 >Login</Button>         
                <div className="social mt-3 d-flex">
                    <Button type="primary" shape="circle" icon={<FacebookOutlined />} size={"large"}></Button>
                    <Button type="primary" className="ml-3" shape="circle" icon={<TwitterOutlined />} size={"large"}></Button>
                </div>
            </form>

           
        </div>
    )
}



const LoginCyberbugsWithFormik = withFormik({
    mapPropsToValues: () => ({ 
        //tên các trường muốn formik lấy dữ liệu
        email: '', 
        password:''
     }),
  
     validationSchema:  Yup.object().shape({ // Validate form field
        email: Yup.string().required('Email không được để trống').email('email không hợp lệ'),
        password: Yup.string().required('password không được để trống').min(6,'password không được nhỏ hơn 6 kí tự').max(15,'password không được lơn hơn 15 kí tự'),
    }),
  
    handleSubmit: (values, {props, setSubmitting }) => {
        //chỉ khi nào nhập đúng vs validation thì mới trigger hàm handleSubmit(nghĩa là mới cho phép submit)
        console.log("values khi submit", values);
        // console.log("props in LoginCyberbugsWithFormik", props);
        //!khi nhấn vào nút submit ta muốn dispatch values đi nhưng useDispatch là hook nên chỉ đc sử dụng trong RFC => muốn sử dụng đc dispatch ở đây thì phải dùng props.dispatch
        let action = {
            type: USER_SIGNIN_CYBERBUGS_SAGA,
            userLogin: values,
            //truyền thêm prop history để chuyển hướng ở UserCyberbugsSaga
            // history: props.history,
        }
        props.dispatch(action);
    },
  
    displayName: 'LoginCyberbugs',
  })(LoginCyberbugs);

  //!LoginCyberbugsWithFormik đc tạo ra từ component cũ là LoginCyberbugs nhưng LoginCyberbugsWithFormik có chứa thêm các prop của formik (LoginCyberbugsWithFormik là HOC của component cũ LoginCyberbugs)
//? nên component LoginCyberbugs cũng có các props của formik




//*hàm connect cho phép thêm các props của thư viện redux thành props của component HOC LoginCyberBugsWithFormik
//* ==> có thể sử dụng props.dispatch() bên trong HOC LoginCyberbugsWithFormik
  export default connect() (LoginCyberbugsWithFormik);
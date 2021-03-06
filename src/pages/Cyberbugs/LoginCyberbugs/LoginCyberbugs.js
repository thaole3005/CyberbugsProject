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
        //t??n c??c tr?????ng mu???n formik l???y d??? li???u
        email: '', 
        password:''
     }),
  
     validationSchema:  Yup.object().shape({ // Validate form field
        email: Yup.string().required('Email kh??ng ???????c ????? tr???ng').email('email kh??ng h???p l???'),
        password: Yup.string().required('password kh??ng ???????c ????? tr???ng').min(6,'password kh??ng ???????c nh??? h??n 6 k?? t???').max(15,'password kh??ng ???????c l??n h??n 15 k?? t???'),
    }),
  
    handleSubmit: (values, {props, setSubmitting }) => {
        //ch??? khi n??o nh???p ????ng vs validation th?? m???i trigger h??m handleSubmit(ngh??a l?? m???i cho ph??p submit)
        console.log("values khi submit", values);
        // console.log("props in LoginCyberbugsWithFormik", props);
        //!khi nh???n v??o n??t submit ta mu???n dispatch values ??i nh??ng useDispatch l?? hook n??n ch??? ??c s??? d???ng trong RFC => mu???n s??? d???ng ??c dispatch ??? ????y th?? ph???i d??ng props.dispatch
        let action = {
            type: USER_SIGNIN_CYBERBUGS_SAGA,
            userLogin: {
                "email": values.email,
                "passWord": values.password,
            }
            //truy???n th??m prop history ????? chuy???n h?????ng ??? UserCyberbugsSaga
            // history: props.history,
        }
        props.dispatch(action);
    },
  
    displayName: 'LoginCyberbugs',
  })(LoginCyberbugs);

  //!LoginCyberbugsWithFormik ??c t???o ra t??? component c?? l?? LoginCyberbugs nh??ng LoginCyberbugsWithFormik c?? ch???a th??m c??c prop c???a formik (LoginCyberbugsWithFormik l?? HOC c???a component c?? LoginCyberbugs)
//? n??n component LoginCyberbugs c??ng c?? c??c props c???a formik




//*h??m connect cho ph??p th??m c??c props c???a th?? vi???n redux th??nh props c???a component HOC LoginCyberBugsWithFormik
//* ==> c?? th??? s??? d???ng props.dispatch() b??n trong HOC LoginCyberbugsWithFormik
  export default connect() (LoginCyberbugsWithFormik);
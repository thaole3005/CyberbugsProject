import React, {useEffect} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react'; 
import {withFormik, Form} from 'formik';
import * as Yup from "yup";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from './../../../redux/constants/Cyberbugs/ProjectConst/ProjectCategoryConst';
import { CREATE_PROJECT_SAGA } from './../../../redux/constants/Cyberbugs/ProjectConst/ProjectConst';



function CreateProject(props) {
        //! component CreateProject vừa có các prop của formik, Route, và redux
        // console.log("props in CreateProject", props);

        const dispatch = useDispatch();

        const {arrProjectCategory} = useSelector(state => state.ProjectCategoryReducer);
        // console.log("arrProjectCategory", arrProjectCategory);


      //lúc mới vào trang web thì dispatch action call api để lấy về các product category rồi lưu vào redux Store
      useEffect(()=> {
        // console.log("useEffect dispatch");
        //dispatch action api lên saga
        dispatch({type: GET_ALL_PROJECT_CATEGORY_SAGA,})
    }, [])



    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,     //cho phép set lại nguyên cả object values khi submit mà không cần thông qua handle change, có thể gọi hàm này để set lại value ở bất cứ hàm nào
        setFieldValue  //cho phép set lại value của 1 field nào đó, còn value các trường còn lại giữ nguyên, khi submit mà không cần thông qua handle change, có thể gọi hàm này để set lại value ở bất cứ hàm nào
    } = props;



    const handleEditorChange = (content, editor) => {
        console.log("content", content);
        console.log("editor", editor);
        setFieldValue("description", content);
    }


    return (
        <div className="container mt-4">
            <h3>CreateProject</h3>
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name = "projectName" onChange = {handleChange}/>
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <>
                        <Editor
                            name = "description"
                            initialValue="<p>This is the description of your project.</p>"
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                             'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </>
               
                </div>
                <div className="form-group">
                   <select name = "categoryId" className="form-control" onChange = {handleChange}>
                       {
                           arrProjectCategory.map((item, index) => {
                               return <option key={index} value = {item.id}>{item.projectCategoryName}</option>
                           })
                       }
                   </select>
                </div>
                <button className="btn btn-success" type ="submit">Create project</button>
            </form>
        </div>
    )
}


const CreateProjectFrm = withFormik({
    //*enableReinitialize là để mỗi khi prop của redux có gtri thay đổi thì sẽ luôn chạy vào hàm enableReinitialize
    enableReinitialize: true,  //nếu k có thuộc tính này thì khi giá trị lấy từ redux thay đổi, vẫn sẽ k chạy vào hàm này => categoryId sẽ bị undefined
    mapPropsToValues: (props) => ({ 
        projectName: '',
        description: '',
        categoryId: props.arrProjectCategory[0]?.id,

     }),
  
    // Custom sync validation
    validationSchema: Yup.object().shape({

    }),
  
    handleSubmit: (values, {props, setSubmitting }) => {
        // console.log("props của CreateProjectFrm", props);
        console.log("values sau khi submit createPro",values);
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values,
        })
    },
  
    displayName: 'createProjectForm',
  })(CreateProject);


  const mapStateToProps = (state) => {
      return {

        //?nhờ hàm mapStateToProps nên arrProjectCategory trở thành 1 prop của redux
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
      }
  }


  //!component CreateProjectFrm đc bao bọc bởi hàm connect => sẽ chứa các props của redux
  export default connect(mapStateToProps) (CreateProjectFrm);
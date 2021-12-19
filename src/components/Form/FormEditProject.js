import React, {useState, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { SET_SUBMIT_EDIT_PROJECT } from '../../redux/constants/Cyberbugs/DrawConst/DrawConst';
import ReactHtmlParser from "html-react-parser"; //thư viện cho phép parse từ html tag sang jsx tag
import { GET_ALL_PROJECT_CATEGORY_SAGA } from './../../redux/constants/Cyberbugs/ProjectConst/ProjectCategoryConst';
import { UPDATE_PROJECT_SAGA } from './../../redux/constants/Cyberbugs/ProjectConst/ProjectConst';




function FormEditProject(props) {
    const dispatch = useDispatch();

    //ngay khi click vào nút chỉnh sửa project(nghĩa là lúc đó component này đc render thì dispatch hàm handleSubmit của formik lên DrawerReducer)
    useEffect(() => {

        //dispatch action saga để mảng categoryProject
        dispatch({type: GET_ALL_PROJECT_CATEGORY_SAGA})


        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: handleSubmit,
        })
    }, [])


    const {arrProjectCategory} = useSelector(state => state.ProjectCategoryReducer);
    // console.log("arrProjectCategory", arrProjectCategory);


    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert('submit edit form');
    // }




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

    // console.log("PROPS of FormEditProject", props)
    // console.log("props.values của component FormEditProject", props.values);

  

    
    
    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content);
        
    }
    
    // console.log("RENDER FormEditProject");
    return (
        <form className = "container-fluid" onSubmit = {handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <h5 className="font-weight-bold">Project Id</h5>
                        <input disabled className="form-control" type = "text" value = {values.id} name = "id"/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <h5 className="font-weight-bold">Project Name</h5>
                        <input className="form-control" type = "text" value = {values.projectName} name = "projectName" onChange = {handleChange}/>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <h5 className="font-weight-bold">Project Category</h5>
                        <select name = "categoryId" value = {values.categoryId}  onChange = {handleChange}>
                            {
                                arrProjectCategory.map((item, index) => {
                                    return <option value = {item.id}>{item.projectCategoryName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className = "col-12">
                    <div className="form-group">
                    <>
                        <Editor
                            name = "description"
                            value={values.description}
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
                </div>
            </div>
        </form>
    )
}



const editProjectFrm = withFormik({
    //*bên trong là các hàm của withFormik => k thể sử đụng hook ở trong này
    enableReinitialize: true,  //nếu k có thuộc tính này thì khi giá trị lấy từ redux thay đổi, vẫn sẽ k chạy vào hàm này => categoryId sẽ bị undefined
    mapPropsToValues: (props) => { 
        //lấy props projectEdit từ ProjectReducer và map nó thành value trên form
        //?cái gì đc return ở hàm mapPropsToValues của withFormik chính là gtri props.values của component FormEditProject

        const {projectEdit} = props;

        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            description: projectEdit?.description,
            categoryId: projectEdit?.categoryId,
          }
        
     },

     
  
    validationSchema: Yup.object().shape({

    }),
  
    handleSubmit: (values, {props, setSubmitting }) => {
        // console.log("props của editProjectFrm", props);
        console.log("values sau khi submit editProjectFrm",values);
        //khi ng dùng bấm submit thì gọi action saga updateProject để đưa dữ liệu đã đc update lên serve
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            updatedProject: values,
        })
    },
  
    displayName: 'createProjectForm',
  })(FormEditProject);


  const mapStateToProps = (state) => {
      return {

        //?nhờ hàm mapStateToProps nên projectEdit trở thành 1 prop của redux
        projectEdit: state.ProjectReducer.projectEdit,
      }
  }


  //!component CreateProjectFrm đc bao bọc bởi hàm connect => sẽ chứa các props của redux
  export default connect(mapStateToProps) (editProjectFrm);
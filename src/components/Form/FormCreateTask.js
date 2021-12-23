import React, {useState, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider  } from 'antd';
import  {connect, useSelector, useDispatch} from 'react-redux';
import { GET_PROJECT_LIST_SAGA } from './../../redux/constants/Cyberbugs/ProjectConst/ProjectConst';
import { GET_ALL_TASK_PRIORITY_SAGA, GET_ALL_TASK_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA } from '../../redux/constants/Cyberbugs/TaskConst/TaskConst';
import { GET_USER_CYBERBUGS_SEARCH_SAGA, GET_USER_BY_PROJECT_ID_SAGA } from './../../redux/constants/Cyberbugs/UserConst';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import ReactHtmlParser from "html-react-parser"; //thư viện cho phép parse từ html tag sang jsx tag
import { CREATE_NEW_TASK_SAGA } from './../../redux/constants/Cyberbugs/TaskConst/TaskConst';
import { SET_SUBMIT_CREATE_TASK } from '../../redux/constants/Cyberbugs/DrawConst/DrawConst';






const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}



function FormCreateTask(props) {


    const [size, setSize] = React.useState('default');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    // console.log("timeTracking", timeTracking);

    const dispatch = useDispatch();

    //?lấy data cần thiết để biding lên form cho ng dùng chọn
    const {projectList} = useSelector(state => state.ProjectReducer);
    // console.log("projectList in FormCreateTask", projectList);
    


    const {arrTaskType} = useSelector(state => state.TaskTypeReducer);
    // console.log("arrTaskType", arrTaskType);


    const {arrPriority} = useSelector(state => state.TaskPriorityReducer);
    // console.log("arrPriority", arrPriority);


    const {arrStatus} = useSelector(state => state.TaskStatusReducer);
    // console.log("arrStatus", arrStatus);


    const {arrUserByProjectId} = useSelector(state => state.UserCyberbugsReducer);
    // console.log("arrUserByProjectId", arrUserByProjectId);

    //* biến đổi mảng arrUserByProjectId thành mảng [{value, label}] thì mới có thể sử dụng trong thẻ Select của AntDesign
    const userOptions = arrUserByProjectId.map((user, index) => {
        return {label: user.name, value: user.userId}
    })
    // console.log("userOptions", userOptions);

   

    //!những thao tác cần thực hiện khi mới hiển thị component FormCreateTask
    useEffect(() => {
        //lấy mảng ProjectList về để hiển thị ở dropdown ProjectName
        dispatch({
            type: GET_PROJECT_LIST_SAGA,
        })

        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA,
        })

        dispatch({
            type: GET_ALL_TASK_PRIORITY_SAGA

        })

        dispatch({
            type: GET_ALL_TASK_STATUS_SAGA

        })

        dispatch({
            type: GET_USER_CYBERBUGS_SEARCH_SAGA,
            kewWordName: '',

        })

        //!ngay khi comkponent này render xong thì gửi hàm handleSubmit của formik trong component này lên DrawerReducer để HOC DraweCyberBugs sẽ biding hàm callbackSubmit này vào nút Submit của HOC DraweCyberBugs
        dispatch({
            type: SET_SUBMIT_CREATE_TASK,
            submitFunction: handleSubmit,
        })

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

    // console.log("values của component FormCreateTask", values)

    return (
        <form className="container" onSubmit = {handleSubmit}>
           
            <div className="form-group">
                <p>Project Name</p>
                <select name = "projectId" className="form-control"  onChange={(e) => {
                    let {value} = e.target;
                    //mỗi lần select projectName thì call api để lấy ra mảng arrUser ứng vs project đó
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        projectId: value
                    })

                    //đưa giá trị projectId đc chọn cho forrmik
                    setFieldValue("projectId", value);
                }}>
                    {
                        projectList.map((project, index) => {
                            return <option value={project.id} key ={index}>{project.projectName}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <p>Task Name</p>
                <input className = "form-control" name = "taskName" onChange={handleChange} />
            </div>

            <div className="form-group">
                <p>Status Name</p>
                <select name = "statusId" className="form-control"  onChange={handleChange}>
                    {
                        arrStatus.map((statusItem, index) => {
                            return <option value={statusItem.statusId} key ={index}>{statusItem.statusName}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <div className = "row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select className="form-control" name="priorityId" onChange={handleChange}>
                            {
                                arrPriority.map((item, index) => {
                                    return <option value ={item.priorityId} key = {index}>{item.priority}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task Type</p>
                        <select className ="form-control" name ="typeId"  onChange={handleChange}>
                            {
                                arrTaskType?.map((item, index) => {
                                    return <option key = {index} value ={item.id}>{item.taskType}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
          
            <div className="form-group">
                <div className = "row">
                    <div className="col-6">
                        <p>Assigners</p>
                        <Select
                        mode="multiple"
                        size={size}
                        placeholder="Please select"
                        options={userOptions}
                        // defaultValue={['thao', 'nhi']}
                        optionFilterProp="label" //để search trên thẻ option theo label
                        onChange={(values) => {
                            // console.log("mảng values userId đc chọn", values);
                            setFieldValue("listUserAsign", values);
                        }}
                        onSearch = {(text) => {
                            // console.log("text khi ngdung onSearch", text);
                            //*hoặc có thể dispatch action để lấy list user tại useEffect, nghĩa là chỉ tạo ra mảng options 1 lần
                            //?mỗi khi ng dùng search trong thẻ Select thì gọi api lấy về tất cả mảng user mới nhất
             
                        }}
                        style={{ width: '100%' }}
                        >
                            {children}
                        </Select>

                        <div className="row mt-3">
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" defaultValue= "0" min="0" className="form-control" name="originalEstimate" onChange={handleChange}/>
                            </div>
                        </div>  
                    </div>

                    <div className="col-6">
                        <p>Time Tracking</p>
                        <Slider value= {Number(timeTracking.timeTrackingSpent)} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className="row">
                                <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent} h logged</div>
                                <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingRemaining} h remaining</div>
                        </div>
                        <div className="row"  style = {{marginTop: '5px'}}>
                            <div className="col-6">
                                <p className="text-primary">Time spent</p>
                                <input type="number" defaultValue= "0" min="0" className="form-control" name="timeTrackingSpent"
                                onChange = {(e) => {
                                    let {name, value} = e.target;
                                    // console.log('timeTrackingSpent', value)
                                    setTimeTracking({
                                        ...timeTracking,
                                        [name]: value,
                                    });
                                    setFieldValue('timeTrackingSpent', value);
                                }}/>
                            </div>
                            <div className="col-6">
                                <p className="text-primary">Time Time remaining</p>
                                <input type="number" defaultValue= "0" min="0" className="form-control" name ="timeTrackingRemaining"
                                onChange = {(e) => {
                                    let {name, value} = e.target;
                                    // console.log('timeTrackingRemaining', value)

                                    setTimeTracking({
                                        ...timeTracking,
                                        [name]: value,
                                    });
                                    
                                    setFieldValue('timeTrackingRemaining', value);
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <p>Description</p>
                <>
                    <Editor
                        name = "description"
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
                        onEditorChange={(content, editor) => {
                            setFieldValue('description', content);
                        }}
                    />
                </>
            </div>

            <button type="submit" className="btn btn-success d-none">Submit</button>
        </form>
    )
}




const createTaskFrm = withFormik({
    //*bên trong là các hàm của withFormik => k thể sử đụng hook ở trong này
    enableReinitialize: true, 
    mapPropsToValues: (props) => { 
        //lấy props projectEdit từ ProjectReducer và map nó thành value trên form
        //?cái gì đc return ở hàm mapPropsToValues của withFormik chính là gtri props.values của component FormEditProject

        const {projectList, arrPriority, arrTaskType, arrStatus} = props;
       
        // if(projectList.length > 0) {
        //     //mặc định khi mở form createTask thì ở mục ASSIGNERS sẽ lấy userList ủa project đầu tiên trong dropdown
        //     props.dispatch({
        //         type: GET_USER_BY_PROJECT_ID_SAGA,
        //         projectId: projectList[0]?.id,
        //     })
        // }

        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: projectList[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: [],
          }
        
     },

     
  
    validationSchema: Yup.object().shape({

    }),
  
    handleSubmit: async (values, {props, setSubmitting }) => {
        const {projectList, arrPriority, arrTaskType, arrStatus} = props;

        // console.log("props của editProjectFrm", props);
        console.log("values sau khi submit FormCreateTask",values);
        //khi ng dùng bấm submit thì gọi action saga create newTask để đưa dữ liệu ng dùng nhập và tạo ra task mới lên serve
        await props.dispatch({
            type: CREATE_NEW_TASK_SAGA,
            newTask: values,
        });

        props.setValues({
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: projectList[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: [],
        })
    },
  
    displayName: 'createTask Form',
  })(FormCreateTask);

  const mapStateToProps = (rootReducer) => {
    
    return {
        projectList: rootReducer.ProjectReducer.projectList,
        arrTaskType: rootReducer.TaskTypeReducer.arrTaskType,
        arrPriority: rootReducer.TaskPriorityReducer.arrPriority,
        arrStatus: rootReducer.TaskStatusReducer.arrStatus, 

    }
}



  //!component createTaskFrm đc bao bọc bởi hàm connect => sẽ chứa các props của redux
  export default connect(mapStateToProps) (createTaskFrm);
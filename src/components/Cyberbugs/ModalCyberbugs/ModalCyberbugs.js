import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import {CHANGE_TASK_ASSIGNESS, GET_ALL_TASK_PRIORITY_SAGA, GET_ALL_TASK_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA, HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK, UPDATE_STATUS_TASK_SAGA } from "../../../redux/constants/Cyberbugs/TaskConst/TaskConst";
import { CHANGE_TASK_DETAIL_MODAL, REMOVE_USER_ASSIGN } from './../../../redux/constants/Cyberbugs/TaskConst/TaskConst';


const { Option } = Select;




export default function ModalCyberbugs() {

  const dispatch = useDispatch();
  const {taskDetailModal} = useSelector(rootReducer => rootReducer.TaskReducer);
  console.log("taskDetailModal", taskDetailModal);


  const {arrTaskType} = useSelector(state => state.TaskTypeReducer);
  const {arrStatus} = useSelector(state => state.TaskStatusReducer);
  const {arrPriority} = useSelector(state => state.TaskPriorityReducer);
  // console.log("arrPriority", arrPriority)
  let {projectDetail} = useSelector(state => state.ProjectReducer);



  useEffect(() => {
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    })

    dispatch({
      type: GET_ALL_TASK_STATUS_SAGA,
    })

    dispatch({
      type: GET_ALL_TASK_PRIORITY_SAGA,
    })

  }, [])


  const renderTimeTracking =() => {
    const {timeTrackingSpent, timeTrackingRemaining} = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round(Number(timeTrackingSpent)/max*100);


    return  <div style={{ display: "flex" }}>
              <i className="fa fa-clock" />
              <div style={{ width: "100%" }}> 
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${percent}%` }}
                    aria-valuenow={Number(timeTrackingSpent)}
                    aria-valuemin={Number(timeTrackingRemaining)}
                    aria-valuemax={max}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                  <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                  <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
                </div>

                <div className="row">
                      <div className="col-6">
                          <div className="form-group">
                              <input className="form-control" type = "number" name = "timeTrackingSpent" value = {taskDetailModal.timeTrackingSpent} onChange ={handleChange}/>
                          </div>
                      </div>
                      <div className="col-6">
                          <div className="form-group">
                              <input className="form-control" type = "number" name = "timeTrackingRemaining" value = {taskDetailModal.timeTrackingRemaining} onChange ={handleChange}/>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
  }


  const [visibleSelectAddMem, setVisibleSelectAddMem] = useState(false);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
  const [contentEditor, setContentEditor] = useState(taskDetailModal.description);
//  console.log("contentEditor", contentEditor)
  const renderDescription =() => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return <div>
              {
                visibleEditor ?   <div>
                <Editor
                    name = "description"
                    initialValue={taskDetailModal.description}
                    // value = {taskDetailModal.description}
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
                      console.log("content", content);
                      setContentEditor(content);
                    }}
                />
                <div className="text-right mt-3">
                  <button className="btn btn-success" onClick = {() => {
                    console.log("contentEditor khi submit", contentEditor)
                    dispatch({
                      type: HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK,
                      actionType: CHANGE_TASK_DETAIL_MODAL,
                      name: 'description', 
                      value: contentEditor,
                    })

                    setVisibleEditor(false);
                  }}>Save</button>
                  <button className="btn btn-danger ml-2" onClick = {() => {
                    setVisibleEditor(false);
                  }}>Close</button>
                </div>
              </div> :    <div className="taskDescription my-4" onClick = {() => {setVisibleEditor(!visibleEditor)}}>
                            {jsxDescription}
                          </div>
              }
           
            
          </div>
  }


  const handleChange = (e) => {
    let {name, value} = e.target;
    dispatch({
      type: HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK,
      actionType: CHANGE_TASK_DETAIL_MODAL,
      name,
      value
    })
  }


  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select name ="typeId" value = {taskDetailModal.typeId} onChange ={handleChange}>
                {
                  arrTaskType.map((item, index) => {
                    return <option key={index} value={item.id}>{item.taskType}</option>
                  })
                }
              </select>
              <h2 className="text-danger">{taskDetailModal.taskName}</h2>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <h5 className="text-success">Description <i class="fas fa-arrow-alt-circle-down"></i></h5>
                    {
                      renderDescription()
                    }
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src="./assets/img/download (1).jfif" alt />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img src="./assets/img/download (1).jfif" alt />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select className="custom-select" name="statusId" value = {taskDetailModal.statusId} onChange = {(e) => {
                      // dispatch({
                      //   type: UPDATE_STATUS_TASK_SAGA,
                      //   updateStatusTask: {
                      //     "taskId": taskDetailModal.taskId,
                      //     "statusId": e.target.value,
                      //   },
                      //   projectId: taskDetailModal.projectId,
                      // })

                      handleChange(e);
                    }}>
                      {
                        arrStatus.map((item, index) => {
                          return <option key={index} value={item.statusId}>{item.statusName}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className ="row mt-2">
                      {
                          taskDetailModal.assigness.map((user, index) => {
                            return  <div className="col-6 my-2">
                                      <div style={{ display: "flex" }} key={index} className="item">
                                        <div className="avatar">
                                          <img src={user.avatar} alt = {user.name} />
                                        </div>
                                        <p className="name mt-1 ml-1">
                                          {user.name}
                                          <i
                                            className="fa fa-times"
                                            style={{ marginLeft: 5, cursor: 'pointer' }}
                                            onClick = {() => {
                                              dispatch({
                                                type: HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK,
                                                actionType: REMOVE_USER_ASSIGN,
                                                userId: user.id,
                                              })
                                            }}
                                          />
                                        </p>
                                      </div>
                                     </div>
                          })
                        }
                        <div className = "col-6 my-2">
                          <button className="btn btn-success w-100" onClick = {() => {setVisibleSelectAddMem(!visibleSelectAddMem)}}>Add more</button>
                 
                            {
                              visibleSelectAddMem ? <Select name ="lstUser" className="form-control" 
                              optionFilterProp="label"
                              value = "select user"
                              options = {
                                projectDetail.members?.filter(member => {
                                  let index = taskDetailModal.assigness?.findIndex(user => user.id === member.userId);
                                  if(index >= 0) {
                                    return false;
                                  }
                                  return true;
                                }).map((user, index) => {
                                  return {label: user.name, value: user.userId}
                                })
                              }
                              onSelect = {(valueUserId) => {
                                // console.log("valueUserId", valueUserId)
                                let userSelect = projectDetail.members?.find(user => user.userId === valueUserId);
                                userSelect = {...userSelect, id: userSelect.userId};
                                console.log("userSelect", userSelect);
  
                                dispatch({
                                  type: HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK,
                                  actionType: CHANGE_TASK_ASSIGNESS,
                                  userSelect,
                                })
                              }}
                              >
                              </Select> :''
                            } 
                            
                         
                        </div>
                    </div>
                  </div>
                  
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select name="priorityId" value ={taskDetailModal.priorityId} onChange ={handleChange}>
                        {
                          arrPriority.map((item, index) => {
                            return <option value={item.priorityId} key = {index}>{item.priority}</option>
                          })
                        }
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input type="text" className="estimate-hours" name ="originalEstimate" value ={taskDetailModal.originalEstimate} onChange ={handleChange}/>
                  </div>
                  <div className="time-tracking">
                    <h6 className="font-weight-bold text-dark">TIME TRACKING</h6>
                      {
                        renderTimeTracking()
                      }
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

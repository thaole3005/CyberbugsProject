import React, {useState, useEffect,useRef} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Table, Button, Popover, Tag, Popconfirm, message,  Avatar, AutoComplete, Space  } from 'antd';
import ReactHtmlParser from "html-react-parser"; //thư viện cho phép parse từ string tag sang jsx tag
import { EditOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { EDIT_PROJECT, GET_PROJECT_LIST_SAGA, DELETE_PROJECT_SAGA } from './../../../redux/constants/Cyberbugs/ProjectConst/ProjectConst';
import { OPEN_DRAWER, OPEN_FORM_EDIT_PROJECT } from './../../../redux/constants/Cyberbugs/DrawConst/DrawConst';
import FormEditProject from './../../../components/Form/FormEditProject';
import { ASSIGN_USER_TO_PROJECT_SAGA, GET_USER_CYBERBUGS_SEARCH_SAGA, REMOVE_USER_FROM_PROJECT_SAGA } from './../../../redux/constants/Cyberbugs/UserConst';
import { NavLink } from 'react-router-dom';



//data chính là dữ liệu all Project lấy từ server về
const data = [
    {
      "members": [
        {
          "userId": 588,
          "name": "kiett",
          "avatar": "https://ui-avatars.com/api/?name=kiett"
        },
        {
          "userId": 545,
          "name": "kiwi",
          "avatar": "https://ui-avatars.com/api/?name=kiwi"
        }
      ],
      "creator": {
        "id": 332,
        "name": "Luan Tran"
      },
      "id": 1687,
      "projectName": "sdung xoa cua to nua ma , huhuhuhu , yeu cac cau lam okie nha",
      "description": "<p>ylati yssup evah</p>\n<p><span style=\"background-color: #2dc26b;\">sscaacacaclamlccaaa111122s</span></p>\n<p>&nbsp;</p>",
      "categoryId": 2,
      "categoryName": "Dự án phần mềm",
      "alias": "sdung-xoa-cua-to-nua-ma-huhuhuhu-yeu-cac-cau-lam-okie-nha",
      "deleted": false
    },
    {
      "members": [
        {
          "userId": 536,
          "name": "Thiên Bá",
          "avatar": "https://ui-avatars.com/api/?name=Thiên Bá"
        },
        {
          "userId": 537,
          "name": "Quoc Thien",
          "avatar": "https://ui-avatars.com/api/?name=Quoc Thien"
        }
      ],
      "creator": {
        "id": 649,
        "name": "MRX"
      },
      "id": 1706,
      "projectName": "12311",
      "description": "<p>Description project new!</p>",
      "categoryId": 2,
      "categoryName": "Dự án phần mềm",
      "alias": "12311",
      "deleted": false
    },
    {
      "members": [
        {
          "userId": 337,
          "name": "Quan",
          "avatar": "https://ui-avatars.com/api/?name=Quan"
        },
        {
          "userId": 495,
          "name": "khai",
          "avatar": "https://ui-avatars.com/api/?name=khai"
        },
        {
          "userId": 477,
          "name": "HiepHoang",
          "avatar": "https://ui-avatars.com/api/?name=HiepHoang"
        },
        {
          "userId": 524,
          "name": "PHAN THI MY",
          "avatar": "https://ui-avatars.com/api/?name=PHAN THI MY"
        }
      ],
      "creator": {
        "id": 506,
        "name": "PHAN THI MY"
      },
      "id": 1714,
      "projectName": "CON MEO HU",
      "description": "<p>gghjhjkjkljl meo thui</p>",
      "categoryId": 1,
      "categoryName": "Dự án web",
      "alias": "con-meo-hu",
      "deleted": false
    },
    {
      "members": [
        {
          "userId": 455,
          "name": "Lộc",
          "avatar": "https://ui-avatars.com/api/?name=Lộc"
        }
      ],
      "creator": {
        "id": 626,
        "name": "Cuong"
      },
      "id": 1725,
      "projectName": "Test Project 12",
      "description": "",
      "categoryId": 1,
      "categoryName": "Dự án web",
      "alias": "test-project-12",
      "deleted": false
    },
    {
      "members": [
        {
          "userId": 453,
          "name": "Thành Đạt",
          "avatar": "https://ui-avatars.com/api/?name=Thành Đạt"
        },
        {
          "userId": 301,
          "name": "Nguyen Minh Hieu",
          "avatar": "https://ui-avatars.com/api/?name=Nguyen Minh Hieu"
        }
      ],
      "creator": {
        "id": 401,
        "name": "Hauu"
      },
      "id": 1733,
      "projectName": "huhhuhuhuhuhu",
      "description": "<p>mackamckmacmakma</p>",
      "categoryId": 1,
      "categoryName": "Dự án web",
      "alias": "huhhuhuhuhuhu",
      "deleted": false
    },
  ];



  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  
  
  export default function ProjectManagement(props) {

    const dispatch = useDispatch();

    //lấy mảng projectList từ ProjectReducer xuống
    const {projectList} = useSelector(state => state.ProjectReducer);
    // console.log("projectList", projectList);
    
    
    //ngay khi truy cập vào trang /projectmanagement thì gọi action saga để lấy projectList
    useEffect(() => {
      dispatch({
        type: GET_PROJECT_LIST_SAGA,
      })
    }, [])
    
    
    //*lấy mảng userSearchList từ reduxStỏe về mỗi khi ng dùng search user để thêm user vào project tại nút +
    const {userSearchList} = useSelector(state => state.UserCyberbugsReducer);
    //!sau khi lấy đc mảng userSearchList thì đưa nó trở thành option của AutoComplete
    // console.log("userSearchList", userSearchList);
    

  //*tạo state để thay đổi giao diện từ userId => name khi ng dùng search để thêm member vào dự án
  const [valueSearch, setValueSearch] = useState('Nhập tên member');


    //*tạo ra biến searchRef bằng hook useRef để lư lại giá trị của hàm setTimeout khi search ở box Autocomplete
    //* useRef vẫn giữ lại giá trị .current khi state khác thay đổi làm render lại giao diện, thì biến tạo bởi useRef k phải khai báo lại, mà vẫn giữ đc gtri trước đó
    const searchRef = useRef(null);




  //!------------KHÔNG LIÊN QUAN-----------

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })

    // const handleChange = (pagination, filters, sorter) => {
    //   console.log("Various parameters", pagination, filters, sorter);
    //   setState({
    //     filteredInfo: filters,
    //     sortedInfo: sorter,
    //   });
    // };
  
    // const clearFilters = () => {
    //   setState({ filteredInfo: null });
    // };
  
    // const clearAll = () => {
    //   setState({
    //     filteredInfo: null,
    //     sortedInfo: null,
    //   });
    // };
  
    // const setAgeSort = () => {
    //   setState({
    //     sortedInfo: {
    //       order: "descend",
    //       columnKey: "age",
    //     },
    //   });
    // };
  
    let { sortedInfo, filteredInfo } = state;
  
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
  

   
    const columns = [
      {
        title: 'Id',
        //!dataIndex và key phải đặt giống tên thuộc tính ở mảng data cần hiển thị ở table
        dataIndex: 'id',
        key: 'id',
        sorter: (item2, item1) => {
            return item2.id - item1.id;
        },

        // sortDirections: ['descend'],
        
      },
      {
        title: 'Project Name',
        dataIndex: 'projectName',
        key: 'projectName',
        render: (text, record, index) => {
          // console.log("text", text);
          return <NavLink to = {`/projectdetail/${record.id}`}>{text}</NavLink>
        },
        sorter: (item2, item1) => {
            let projectName1 = item1.projectName.trim().toLowerCase();
            let projectName2 = item2.projectName.trim().toLowerCase();
            if(projectName2 < projectName1) {
                return -1;
            }
            return 1;
        },
        // sortDirections: ['descend'],
      },


      {
        title: 'Creator',
        // dataIndex: 'creator',
        key: 'creator',
        render: (text, record, index) => {
            return <div key={index}>
              <Tag color="green">{record.creator?.name}</Tag>
            </div>
        },


        sorter: (item2, item1) => {
            let creatorName1 = item1.creator.name.trim().toLowerCase();
            let creatorName2 = item2.creator.name.trim().toLowerCase();
            if(creatorName2 < creatorName1) {
                return -1;
            }
            return 1;
        },
        
      },

      {
        title: 'Member',
        dataIndex: 'member',
        key: 'member',
        render: (text, record, index) => {
          return <div key={index}>

              {
                record.members?.slice(0,3).map((user, index) => {
                  return <Popover placement="rightTop" title="See Users" trigger="hover" content={() => {
                    return <table className="table">
                      <thead>
                        <tr>
                          <td>UserId</td>
                          <td>Avatar</td>
                          <td>Name</td>
                          <td>Action</td>
                        </tr>
                      </thead>

                      <tbody>
                        {record.members?.map((user, index) => {
                          return <tr key={index}>
                            <td>{user.userId}</td>
                            <td>
                              <Avatar src = {user.avatar}/>
                            </td>
                            <td>{user.name}</td>
                            <td>
                              <button className="btn btn-danger"><DeleteOutlined style={{ fontSize: 17 }} onClick = {() => {
                                dispatch({
                                  type: REMOVE_USER_FROM_PROJECT_SAGA,
                                  userProject: {
                                    "projectId": record.id,
                                    "userId": user.userId,
                                  }
                                })
                              }}/></button>
                            </td>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  }}>
                    <Avatar key={index} src={user.avatar}/>
                  </Popover>
                })
              }

              {record.members?.length>3 ? <Avatar>...</Avatar> : ''}

              <Popover placement="rightTop" title={() => <strong>Add user</strong>} 
              content={() => {
                return <AutoComplete
                className="w-100"
                //!biến đổi mảng userSearchList lấy đc sau khi call api thành mảng các options của AutoComplete

                options = {userSearchList?.map((user, index) => {
                  return {label: user.name, value: user.userId.toString()};
                })}
                value = {valueSearch}
                onSearch = {(valueSearch) => { 
                  // console.log("onSearch")
                  // console.log("searchRef.current", searchRef.current);
                  if(searchRef.current) {
                    // console.log("xóa setTimeout")
                    clearTimeout(searchRef.current);
                  }

                  searchRef.current = setTimeout(() => {
                    //mỗi khi nhập liệu thì dispatch action saga để call api lấy đc mảng userList ứng vs valueSearch mà ng dùng nhập r đưa nó lên reduxStỏe
                    // console.log("valueSearch", valueSearch);
                    dispatch({
                      type: GET_USER_CYBERBUGS_SEARCH_SAGA,
                      kewWordName: valueSearch,
                    })
                  }, 300)


                  
                }}

                onChange = {(valueSearch) => {
                  // console.log("onChange")
                  // console.log("valueSearch", valueSearch);
                  //!setValueSearch mỗi khi nhập liệu để ghi đề giá trị mặc định là 'Nhập tên member'
                  setValueSearch(valueSearch);

                }}

                onSelect = {(valueId, optionObject) => {
                  // console.log("userId", valueId);
                  // console.log("optionObject", optionObject);
                  //!thẻ Autoselect mặc định khi select 1 option thì gtri hiển thị trong ô input của AutoComplete sẽ là option.value(là userId) mà ta cần hiển thị option.label(userName)
                  // => cần set lại giá trị cho ô input là option.label(userName)
                  setValueSearch(optionObject.label);
                  //dispatch action saga để assign user
                  dispatch({
                    type: ASSIGN_USER_TO_PROJECT_SAGA,
                    userProject: {
                      "projectId": record.id,
                      "userId": valueId,
                    }
                  })
                }}                

              />
              }}
               trigger="click">
                <Button style ={{borderRadius: '50%'}}>+</Button>
              </Popover>
          </div>
        }
      },

      {
        title: 'Category Name',
        dataIndex: 'categoryName',
        key: 'categoryName',
        sorter: (item2, item1) => {
            let categoryName1 = item1.categoryName?.trim().toLowerCase();
            let categoryName2 = item2.categoryName?.trim().toLowerCase();
            if (categoryName2 < categoryName1) {
                return -1;
            }
            return 1;
        },

    },

      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record, index) => {
            // console.log("text", text);
            // console.log("record", record);
            // console.log("index", index);

            let jsxContent = ReactHtmlParser(text);
            return <div key = {index}>
                {jsxContent}
            </div>
        }
        
      },

      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record, index) => {
          return <Space key={index}>
              <button className="btn btn-info" onClick = {() => {
                // console.log("record", record);
                  //mỗi lần bấm nút chỉnh sửa thì hiển thị FormEdit
                  dispatch({
                      type: OPEN_FORM_EDIT_PROJECT,
                      Component: <FormEditProject/>,
                      title: 'Edit Project',
                  })

                  //khi click nút chỉnh sửa thì dispatch dữ liệu hiện tại lên state projectEdit ở ProjectReducer
                  const actionEditProject = {
                    type: EDIT_PROJECT,
                    projectEditModel: record,
                  };
                  dispatch(actionEditProject);
              }}><EditOutlined style={{ fontSize: 17 }} /></button>
                <Popconfirm
                placement="topRight"
                title="Are you sure to delete this project?"
                onConfirm={() => {
                  dispatch({
                    type: DELETE_PROJECT_SAGA,
                    projectId: record.id,
                    projectName: record.projectName,
                  })
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button className="btn btn-danger"><DeleteOutlined style={{ fontSize: 17 }} /></button>
              </Popconfirm>
             
        </Space>
        }
          
        
      },

    


    ];








  
    return (
        <div className="container-fluid mt-4">
        <h3>Project Management</h3>
        {/* <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        
      </Space> */}
        <Table columns={columns} rowkey = {"id"} dataSource={projectList} 
        // onChange={handleChange}
        />
      </div>
    )
}

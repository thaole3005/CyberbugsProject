import React, {useEffect} from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain';
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from './../../../components/Cyberbugs/Main/InforMain';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PROJECT_DETAIL_SAGA } from './../../../redux/constants/Cyberbugs/ProjectConst/ProjectConst';

export default function IndexCyberBugs(props) {
    // console.log("props of IndexCyberBugs", props);
    // console.log("projectId", props.match.params.projectId);

    //?mỗi lần ng dùng bấm vào 1 projectName nào đó bên trang /projectmanagement thì chuyển qua bên trang này
    //?lấy dữ liệu projectDetail từ reduxStore biding vào trang projectDetail
    let {projectDetail} = useSelector(state => state.ProjectReducer);
    console.log("projectDetail", projectDetail);

    const dispatch = useDispatch();


    useEffect(() => {
        const projectId = props.match.params.projectId;
        //khi ng dùng link qua trang này thì gọi action saga getProjectDetail để đưa ProjectDetail lên reduxStore
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId,
        })


    }, [])

    return (
        <div  className="main">
            <h3>Cyber Board</h3>
            <HeaderMain projectDetail = {projectDetail}/>
            <InfoMain projectDetail = {projectDetail}/>
            <ContentMain projectDetail = {projectDetail}/>
        </div>
    )
}

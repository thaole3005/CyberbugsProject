import React from 'react'
import ReactHtmlParser from "react-html-parser";



export default function InfoMain(props) {

    const {projectDetail} = props;

   const renderMemberAvatar = () => {
       return projectDetail.members?.map((user, index) => {
            return  <div className="avatar" key = {index}>  
                        <img src={user.avatar} alt={user.name} />
                    </div>
       })
   }

    return (
       
           <>
                <h2 className="text-danger">{props.projectDetail.projectName}</h2>
                <section>
                    <h3 className="text-success">------------Description------------</h3>
                    <div>
                        {ReactHtmlParser(projectDetail.description)}
                    </div>
                </section>
                <div className="info" style={{ display: 'flex' }}>
                    <div className="search-block">
                        <input className="search" />
                        <i className="fa fa-search" />
                    </div>
                   
                    <div className="avatar-group" style={{ display: 'flex' }}>
                        {renderMemberAvatar()}
                    </div>
                  
                    <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                    <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
                </div>
            </>
     

    )
}

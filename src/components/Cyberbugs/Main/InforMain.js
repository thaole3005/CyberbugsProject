import React from 'react'
// import ReactHtmlParser from "react-html-parser";



export default function InfoMain(props) {

   

    return (
       
           <>
                <h2>Project ABC</h2>
                <section>
                    <h3 className="text-success">------------Description------------</h3>
                        <p>Đây là project ABC</p>
                </section>
                <div className="info" style={{ display: 'flex' }}>
                    <div className="search-block">
                        <input className="search" />
                        <i className="fa fa-search" />
                    </div>
                   
                    <div className="avatar-group" style={{ display: 'flex' }}>
                        <img src="" alt="mem1" />
                        <img src="" alt="mem2" />
                    </div>
                    <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                    <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
                </div>
            </>
     

    )
}

import React from 'react'
import { useSelector } from "react-redux";

export default function Home() {

    const {userLogin} = useSelector(state => state.UserCyberbugsReducer);

    return (
        <div className="text-center d-flex mt-5" style = {{flexDirection: 'column', alignItems: 'center'}}>
        <h2>Trang chủ</h2>
        <div className="card bg-dark w-25">
          <img className="card-img-top" src={userLogin.avatar} alt = {userLogin.name} />
          <div className="card-body text-white">
            <h4 className="card-title text-white">User: {userLogin?.name}</h4>
            <h4 className="card-title text-white">soDT: {userLogin?.phoneNumber}</h4>
          </div>
        </div>
      </div>
    )
}

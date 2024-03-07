import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import gif from './Iphone-spinner-2.gif';
import { getAllUser } from "../services/user.service";
import './Users.css'
import useFetchData from "../hooks/useFetchData";

const Users = () => {
  const navigate = useNavigate()
  const {loading: isLoading, error, data: users} = useFetchData(getAllUser);

  if (isLoading) {
    return (
      <div className="container-fluid">
        <img src={gif} className='loading-gif' alt=""></img>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div>{error}</div>
      </div>
    );
  }

  const NavigatePage = (userId) => {
    navigate(`/user/${userId}`)
  }

  return (
    <>
      <div className="card-parent">
        {users.map((user) => (
          <div className="user-container ">
            <div className="card user-card " onClick={() => { NavigatePage(user.id) }}>
              <div className="card-body ">
                <div className="container-fluid ">
                  <div className=" ">
                    <img src={user.image} className="user-image" alt=""></img>
                  </div>
                  <div className=" ">
                    <h5 className="card-title ">{user.firstName} {user.maidenName} {user.lastName}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>))}
      </div>
    </>
  )
}
export default Users;
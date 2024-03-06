import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gif from './Iphone-spinner-2.gif'
import { getUserById } from "../services/user.service";
import './UserDetails.css'

const UserDetails = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [user, setUser] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const fetchUserDetails = async (userId) => {
      try {
        const userData = await getUserById(userId)
        setUser(userData);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError("Error while loading data");
      }
    }
    fetchUserDetails(userId);
    setIsLoading(false);
  }, [userId]);

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

  return (
    <>
      <div>
        <Link className="button d-flex justify-content-end  ">
          <button className="back-button btn   mt-4 me-5 fs-5 " onClick={() => { navigate(-1) }}>Back</button>
        </Link>
      </div>
      <div className="user-containers d-flex">
        <div className="user-img">
          <img src={user.image} className="image" alt=""></img>
        </div>
        <div className="user-details">
          <p className="user-title">User details</p>
          <p className="user-name" >{user.firstName} {user.maidenName} {user.lastName}</p>
          <div className="user-data d-flex">
            <div className="user-data-part1">
              <div className="user-data-title"> Bio</div>
              <div><span className="user-info">Age :</span> {user.age}</div>
              <div><span className="user-info">Gender :</span>  {user.gender}</div>
              <div><span className="user-info">UserName :</span> {user.username}</div>
              <div><span className="user-info">Password :</span> {user.password}</div>
              <div><span className="user-info">Birthdate :</span> {user.birthDate}</div>
              <div><span className="user-info">Blood Group :</span> {user.bloodGroup}</div>
              <div><span className="user-info">Height :</span> {user.height}</div>
              <div><span className="user-info">Weight :</span> {user.weight}</div>
              <div><span className="user-info">Eye Colour :</span> {user.eyeColor}</div>
              {user.address && (
                <div><span className="user-info">Hair : </span>{user.hair.color} {user.hair.color}</div>
              )}
              <div><span className="user-info">Domain :</span> {user.domain}</div>
              <div><span className="user-info">University :</span> {user.university}</div>
              <div className="user-data-title">company details</div>
              {user.address && (
                <div>
                  <div><span className="user-info">Address : </span>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode},</div>
                  <div><span className="user-info">Department : </span>{user.company.department}</div>
                  <div><span className="user-info">Name : </span>{user.company.name}</div>
                  <div><span className="user-info">Title : </span>{user.company.title}</div>
                </div>
              )}
            </div>
            <div className="user-data-part2">
              <div className="user-data-title">content</div>
              <div><span className="user-info"> Email :</span> {user.email}</div>
              <div><span className="user-info">Phone :</span> {user.phone}</div>
              <div><span className="user-info">Ip Address :</span> {user.ip}</div>
              <div><span className="user-info">MacAddress :</span> {user.macAddress}</div>
              {user.address && (
                <div><span className="user-info">address : </span>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}.</div>
              )}
              <div className="user-data-title">Bank details</div>
              {user.bank && (
                <div>
                  <div><span className="user-info">CardExp Date : </span>{user.bank.cardExpire}</div>
                  <div><span className="user-info">CardNumber : </span>{user.bank.cardNumber}</div>
                  <div><span className="user-info">CardType : </span>{user.bank.cardType}</div>
                  <div><span className="user-info">Currency : </span>{user.bank.currency}</div>
                  <div><span className="user-info">Iban : </span>{user.bank.iban}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import './UserDetail.css'


const UserDetail = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    const { userId } = useParams();

    async function fetchPostDetails(uId) {
        try {
            const response = await fetch(`https://dummyjson.com/user/${uId}`);
            const postData = await response.json();
            setUsers(postData);



        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    }

    useEffect(() => {
        fetchPostDetails(userId);
    }, [userId]);

    console.log(users)

    return (
        <>
            <Navbar />
            <div>
                <Link className="button d-flex justify-content-end  ">
                    <button className="back-button btn   mt-4 me-5 fs-5 " onClick={() => { navigate(-1) }}>Back</button>
                </Link>
            </div>

            <div className="user-containers d-flex">
                <div className="user-img">
                    <img src={users.image} className="image"></img>
                </div>
                <div className="user-details">
                    <p className="user-title">User details</p>
                    <p className="user-name" >{users.firstName} {users.maidenName} {users.lastName}</p>
                    <div className="user-data d-flex">
                        <div className="user-data-part1">
                            <div className="user-data-title"> Bio</div>
                            <div><span className="user-info">Age :</span> {users.age}</div>
                            <div><span className="user-info">Gender :</span>  {users.gender}</div>
                            <div><span className="user-info">UserName :</span> {users.username}</div>
                            <div><span className="user-info">Password :</span> {users.password}</div>
                            <div><span className="user-info">Birthdate :</span> {users.birthDate}</div>
                            <div><span className="user-info">Blood Group :</span> {users.bloodGroup}</div>
                            <div><span className="user-info">Height :</span> {users.height}</div>
                            <div><span className="user-info">Weight :</span> {users.weight}</div>
                            <div><span className="user-info">Eye Colour :</span> {users.eyeColor}</div>
                            {users.address && (
                                <div><span className="user-info">Hair : </span>{users.hair.color} {users.hair.color}</div>
                            )}
                            <div><span className="user-info">Domain :</span> {users.domain}</div>
                            <div><span className="user-info">University :</span> {users.university}</div>
                            <div className="user-data-title">company details</div>
                            {users.address && (
                                <div>
                                    <div><span className="user-info">Address : </span>{users.address.address}, {users.address.city}, {users.address.state}, {users.address.postalCode},</div>
                                    <div><span className="user-info">Department : </span>{users.company.department}</div>
                                    <div><span className="user-info">Name : </span>{users.company.name}</div>
                                    <div><span className="user-info">Title : </span>{users.company.title}</div>
                                </div>
                            )}
                        </div>
                        <div className="user-data-part2">
                            <div className="user-data-title">content</div>
                            <div><span className="user-info"> Email :</span> {users.email}</div>
                            <div><span className="user-info">Phone :</span> {users.phone}</div>

                            <div><span className="user-info">Ip Address :</span> {users.ip}</div>
                            <div><span className="user-info">MacAddress :</span> {users.macAddress}</div>
                            {users.address && (
                                <div><span className="user-info">address : </span>{users.address.address}, {users.address.city}, {users.address.state}, {users.address.postalCode}.</div>
                            )}

                            <div className="user-data-title">Bank details</div>
                            {users.bank && (
                                <div>
                                    <div><span className="user-info">CardExp Date : </span>{users.bank.cardExpire}</div>
                                    <div><span className="user-info">CardNumber : </span>{users.bank.cardNumber}</div>
                                    <div><span className="user-info">CardType : </span>{users.bank.cardType}</div>
                                    <div><span className="user-info">Currency : </span>{users.bank.currency}</div>
                                    <div><span className="user-info">Iban : </span>{users.bank.iban}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetail;

import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './User.css'

const User = () => {

    const Navigate = useNavigate()
    const [users, setusers] = useState([])
    async function postDetail() {
        try {
            let usersData = await fetch('https://dummyjson.com/users')
            let usersContainer = await usersData.json()
            if (usersContainer.users.length > 0) {
                setusers(usersContainer.users)
            }
        } catch (e) {
            console.log('error', e)
        }
    }

    useEffect(() => {
        postDetail()
    }, [])

    const NavigatePage = (userId) => {
        Navigate(`/user/${userId}`)
    }

    console.log(users)
    return (
        <>
            <Navbar />
            <div className="card-parent">
            {users.map((element) => (<div className="user-container ">
                
                <div className="card user-card " onClick={() => { NavigatePage(element.id) }}>
                    <div className="card-body ">
                        <div className="container-fluid ">
                            <div className=" ">
                                <img src={element.image} className="user-image"></img>
                            </div>
                            <div className=" ">
                                <h5 class="card-title ">{element.firstName} {element.maidenName} {element.lastName}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>))}
            </div>
        </>
    )
}
export default User;
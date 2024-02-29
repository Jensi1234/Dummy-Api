import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import gif from './Iphone-spinner-2.gif'
import './User.css'

const User = () => {

    const Navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [users, setUsers] = useState([])

    useEffect(() => {
        setIsLoading(true);
        async function postDetail() {
            try {
                let usersData = await fetch('https://dummyjson.com/users?limit=100')
                let usersContainer = await usersData.json()
                if (usersContainer.users.length > 0) {
                    setUsers(usersContainer.users)
                }
            } catch (e) {
                console.log('error', e)
                setError("Error while loading data");
            }
        }
        postDetail()
        setIsLoading(false);
    }, [])

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
        Navigate(`/user/${userId}`)
    }

    console.log(users)
    return (
        <>
            <div className="card-parent">
                {users.map((element) => (<div className="user-container ">

                    <div className="card user-card " onClick={() => { NavigatePage(element.id) }}>
                        <div className="card-body ">
                            <div className="container-fluid ">
                                <div className=" ">
                                    <img src={element.image} className="user-image" alt=""></img>
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
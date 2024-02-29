import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import './Comment.css'

const Comment = () => {

    const [post, setPost] = useState([]);
    const [comments, setComment] = useState([])
    const [users, setusers] = useState([])
    const { pid } = useParams();



    useEffect(() => {

        async function fetchPostDetails() {
            try {
                const response = await fetch(`https://dummyjson.com/posts/${pid}`);
                const postData = await response.json();
                setPost(postData);
    
                const commentData = await fetch('https://dummyjson.com/comments')
                const data = await commentData.json()
                setComment(data.comments)

                
    
                // let usersData = await fetch('https://dummyjson.com/users' + postData.userId)
                // let usersContainer = await usersData.json()
                // if (usersContainer.users.length > 0) {
                //     setusers(usersContainer.users)
                // }
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        }
        fetchPostDetails();
    }, [pid]);

    console.log(post);
    console.log(comments);
    console.log(users)

    return (
        <>
            <Navbar />
            <Link to="/" className="button d-flex justify-content-end  ">
                <button className="back-button btn   mt-4 me-5 fs-5 ">Back</button>
            </Link>
            <div className="comment">
                <div className="card">
                    <div className="card-header">{post.title}</div>
                    <div className="card-body">
                        <p className="card-text">{post.body}</p>
                        <div className="card-userName">
                            {users.map((user) => {
                                if (post.userId === user.id) {
                                    return (
                                        <a href='#' className='userName'>By {user.firstName} </a>
                                    )
                                }
                            })}
                        </div>
                        <h5 className="comment-title">Comments</h5>
                        <div className="comment-container">
                            {/* {comments.filter((element) => element.postId == post.id ? <p> {element.body}</p> : <p> no Comments!...</p>)} */}
                            {comments.filter((element) => element.postId === post.id).map((commentData) => (
                                <div className="comment-info">
                                    <span>{commentData.body}</span>
                                    <span className="comment-userName"> By {commentData.user.username}</span>
                                </div>))}
                            {comments.filter((element) => element.postId === post.id).length === 0 && (<p>no Comments...</p>)}
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
}

export default Comment;
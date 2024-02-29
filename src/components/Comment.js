
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import gif from './Iphone-spinner-2.gif'
import './Comment.css'

const Comment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [post, setPost] = useState([]);
  const [comments, setComment] = useState([])
  const [users, setUsers] = useState([])
  const [addNewComment, setNewComment] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const { pid } = useParams();

  useEffect(() => {
    async function fetchPostDetails() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/posts/${pid}`);
        const postData = await response.json();
        setPost(postData);

        const commentData = await fetch(`https://dummyjson.com/posts/` + pid + `/comments`)
        const data = await commentData.json()
        setComment(data.comments)
        console.log(comments)

        const getUserId = postData.userId || []
        let usersData = await fetch(`https://dummyjson.com/users/${getUserId}`)
        let usersContainer = await usersData.json()
        setUsers(usersContainer)
      } catch (error) {
        console.error('Error fetching post details:', error);
        setError("Error while loading posts");
      }
    }
    fetchPostDetails();
    setIsLoading(false);


  }, [pid]);

  const changeComment = (e) => {
    setNewComment(e.target.value)
  }
  const addComment = () => {
    const newCommentObj = [...comments]
    newCommentObj.push({
      body: addNewComment,
      postId: pid,
      user: {
        username: newUsername
      }
    })
    setComment(newCommentObj);
    console.log(newCommentObj)
    setNewComment('')
    setNewUsername('')
  }

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

  console.log(post);
  console.log(comments);
  console.log(users)

  return (
    <>
      <Link to="/" className="button d-flex justify-content-end  ">
        <button className="back-button btn   mt-4 me-5 fs-5 ">Back</button>
      </Link>
      <div className="comment">
        <div className="card">
          <div className="card-header">{post.title}</div>
          <div className="card-body">
            <p className="card-text">{post.body}</p>
            <div className="card-userName">
              <a href='#' className='userName'>
                By {users.username}
              </a>
            </div>
            <h5 className="comment-title"> <FaCommentAlt /> Comments</h5>
            <div className="comment-container">
              {comments.length !== 0 ?
                comments.map((commentData, index) => (
                  <div key={index} className="comment-info">
                    <span>{commentData.body}</span>
                    <span className="comment-userName"> By {commentData.user.username}</span>
                  </div>))
                : <p>no Comments...</p>
              }

              <div className="comment-box p-2 mt-3">
                <div className="mt-3 fs-5">Add Comments</div>
                <textarea rows='4' className="input-comment my-3" placeholder="Share your opinion..." aaria-describedby="button-addon2"
                  value={addNewComment}
                  onChange={changeComment}></textarea>
                <div className="d-flex align-items-center">
                  <input className="input-username d-inline" placeholder="Add Username..." aaria-describedby="button-addon2"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)} />
                  <button class="btn comment-btn ms-3 comment-btn" type="button" id="button-addon2" onClick={addComment}>Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;


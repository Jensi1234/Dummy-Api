
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCommentAlt,  FaEdit } from "react-icons/fa";
import AddComment from "./AddComment";
import { MdDelete } from "react-icons/md";
import gif from './Iphone-spinner-2.gif'
import './Comment.css'

const Comment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [post, setPost] = useState([]);
  const [comments, setComment] = useState([])
  const [users, setUsers] = useState([])
  const { pid } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // console.log(comments)

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

  const addNewComment = async (commentData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: commentData.newComment,
          postId: pid,
          userId: 5,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add a new comment');
      }
      const newComment = await response.json();
      setComment([...comments, newComment])
      console.log(comments)
    } catch (error) {
      console.error('Error adding a new comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const deleteComment = async (id) => {
    try {
      console.log(id)
      const response = await fetch(`https://dummyjson.com/comments/${id}`, {
        method: 'DELETE',
      });
      const deletedComment = await response.json()
      setComment(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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

  // console.log(post);
  // console.log(comments);
  // console.log(users)

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
              {comments && comments.length !== 0 ?
                comments.map((commentData, id) => (
                  <div key={id} className="comment-info ">
                    <FaEdit className="edit-comment fs-4 me-2" />
                    <MdDelete className="delete-comment fs-4" onClick={() => deleteComment(commentData.id)} />
                   <span className="ms-3">{commentData.body}</span>  
                    <span className="comment-userName"> By {commentData.user.username}</span>
                  </div>))
                : <p>no Comments...</p>
              }
              <AddComment addNewComment={addNewComment} isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;






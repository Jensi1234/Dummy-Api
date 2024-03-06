import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import AddComment from "./AddComment";
import { MdDelete } from "react-icons/md";
import gif from './Iphone-spinner-2.gif'
import { RiEditBoxFill } from "react-icons/ri";
import { getPostById } from "../services/post.service";
import { deleteCommentById, getCommentsPostById, setNewComment, updatedCommentById } from "../services/comment.service";
import { getUserById } from "../services/user.service";
import './PostDetails.css'

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [post, setPost] = useState([]);
  const [comments, setComment] = useState([])
  const [user, setUser] = useState([])
  const { pid } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editComment, setEditComment] = useState()
  const [editCommentId, setEditCommentId] = useState()

  useEffect(() => {
    const fetchPostDetails = async () => {
      setIsLoading(true);

      try {
        const postData = await getPostById(pid)
        setPost(postData);
        const commentList = await getCommentsPostById(pid)
        setComment(commentList.comments)
        const getUserId = postData.userId || [];
        const userData = await getUserById(getUserId);
        setUser(userData)
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
    console.log('postid', pid)
    try {
      const newComment = await setNewComment(commentData, pid)
      setComment([...comments, newComment])
    } catch (error) {
      console.error('Error adding a new comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteComment = async (commentId) => {
    console.log('commentId', commentId)
    try {
      const deletedComment = await deleteCommentById(commentId);
      setComment(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  const handleEditComment = (comment) => {
    console.log('sdb')
    setEditCommentId(comment.id)
    setEditComment(comment.body)
  }

  const submitComment = async (id) => {
    const updateComment = await updatedCommentById(id, editComment)
    const updatedComment = comments.map((comment) => {
      if (comment.id == id) {
        return { ...comment, body: editComment }
      }
      return comment
    })
    setComment(updatedComment)
    setEditComment(updatedComment)
    setEditCommentId(null)
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
                By {user.username}
              </a>
            </div>
            <h5 className="comment-title"> <FaCommentAlt /> Comments</h5>
            <div className="comment-container">
              {comments && comments.length !== 0 ?
                comments.map((commentData, index) => (
                  <div key={index} className="comment-info ">
                    {editCommentId == commentData.id ? (
                      <div className=" d-flex">
                        <textarea className="comment-textarea w-100"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)} ></textarea>
                        <button className=" submit-button ms-3"
                          onClick={() => submitComment(commentData.id, commentData.body)}>Submit</button>
                      </div>
                    ) : (
                      <div>
                        <RiEditBoxFill className='me-2 fs-5' onClick={() => handleEditComment(commentData)} />
                        <MdDelete className="delete-comment fs-4" onClick={() => deleteComment(commentData.id)} />
                        <span className="ms-3">{commentData.body}</span>
                        <span className="comment-userName"> By {commentData.user.username}</span>
                      </div>
                    )}

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

export default PostDetails;




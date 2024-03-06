import { useEffect, useState } from 'react';
import './Posts.css'
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import gif from './Iphone-spinner-2.gif'
import AddPost from './AddPost';
import { deletePostById, getAllPost, setNewPost } from '../services/post.service';
import { updatedPostById } from '../services/post.service';
import { getAllUser } from '../services/user.service';

const Posts = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editPostTitle, setEditPostTitle] = useState()
  const [editPostBody, setEditPostBody] = useState()
  const [editPostId, setEditPostId] = useState()

  useEffect(() => {
    const postsDetails = async () => {
      setIsLoading(true);

      try {
        const postList = await getAllPost()
        const userList = await getAllUser()
        const users = userList.users || []
        const fetchedPosts = (postList.posts || []).map((post) => {
          const user = users.find((user) => user.id === post.userId)
          return {
            ...post,
            username: user?.username,
          }
        })
        setPosts(fetchedPosts)
        setUsers(userList.users)
      } catch (e) {
        console.log('error', e)
        setError("Error while loading posts");
      }
      setIsLoading(false);
    }
    postsDetails()
  }, [])

  const addNewPost = async (postData) => {
    console.log('postData', postData)
    setIsSubmitting(true)
    try {
      const newPost = await setNewPost(postData)
      newPost.username = 'jane'
      setPosts([...posts, newPost]);
    } catch (error) {
      console.error('Error adding new post:', error);
      setError('Error adding new post');
    }
    setIsSubmitting(false);

  };

  const deletePost = async (postId) => {
    console.log(postId)
    try {
      const deletedPost = await deletePostById(postId);
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  const handleEditPost = (post) => {
    console.log('click')
    setEditPostId(post.id)
    setEditPostTitle(post.title)
    setEditPostBody(post.body)
  }

  const submitPost = async (id) => {
    const updatePost = await updatedPostById(id, editPostTitle, editPostBody)
    const updatedPost = posts.map((post) => {
      if (post.id == id) {
        return { ...post, title: editPostTitle, body: editPostBody }
      }
      return post
    })
    console.log(updatePost)
    setPosts(updatePost)
    setEditPostId(null)
  }

  const NavigatePage = (pid) => {
    navigate(`/post/${pid}`)
  }

  if (isLoading) {
    return (
      <div className="container-fluid-gif">
        <img src={gif} className='loading-gif' alt=''></img>
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
      <a href='#down' className='d-flex justify-content-end' >
        <FaArrowAltCircleDown className='down-arrow mt-3 ' />
      </a>
      <div className='post-mess'>
        {posts.map((postData) => {
          return (
            <div className='post-container' onClick={() => { NavigatePage(postData.id) }}>
              {editPostId == postData.id ? (<>
                <div className="card">
                  <div className="card-header d-flex justify-content-between " >
                    <textarea className="comment-textarea w-100" rows='1'
                      value={editPostTitle}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditPostTitle(e.target.value)} ></textarea>
                  </div>
                  <div className="card-body">
                    <textarea className="comment-textarea w-100" rows='4'
                      value={editPostBody}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditPostBody(e.target.value)} ></textarea>
                    <div className='userName'>
                      <button className=" submit-button ms-3 me-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          submitPost(postData.id, postData.title, postData.body)
                        }}>Submit</button>
                      <a href='#' className='user btn btn-outline-secondary'>
                        {postData.username ? `By ${postData.username}` : "Unknown"}
                      </a>
                    </div>
                  </div>
                </div>
              </>
              ) : (
                <>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between " >
                      {postData.title}
                      <div>
                        <RiEditBoxFill className='me-3 fs-5'
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditPost(postData)
                          }} />
                        <MdDelete className="delete-post fs-5"
                          onClick={(e) => {
                            e.stopPropagation()
                            deletePost(postData.id)
                          }} />
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{postData.body}</p>
                      <div className='userName'>
                        <a href='#' className='user btn btn-outline-secondary'>
                          {postData.username ? `By ${postData.username}` : "Unknown"}
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )
              }
            </div>
          )
        })}
      </div>

      <AddPost addNewPost={addNewPost} isSubmitting={isSubmitting} />
      <a href='#' className='d-flex justify-content-end' >
        <FaArrowAltCircleUp className='up-arrow mt-3 ' />
      </a>
    </>
  )
}
export default Posts;


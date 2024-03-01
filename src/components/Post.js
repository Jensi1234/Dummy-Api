import { useEffect, useState } from 'react';
import './Post.css'
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import gif from './Iphone-spinner-2.gif'
import AddPost from './AddPost';

const Post = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [posts, setPost] = useState([])
  const [users, setUsers] = useState([])
  const[isSubmitting, setIsSubmitting] =useState(false)


  useEffect(() => {
    async function postDetail() {
      setIsLoading(true);
      try {
        const postData = await fetch('https://dummyjson.com/posts?limit=150')
        const usersData = await fetch('https://dummyjson.com/users?limit=100')
        const data = await postData.json()
        const usersContainer = await usersData.json()
        const users = usersContainer.users || []
        const fetchedPosts = (data.posts || []).map((post) => {
          const user = users.find((user) => user.id === post.userId)
          return {
            ...post,
            username: user?.username,
          }
        })
        setPost(fetchedPosts)
        setUsers(usersContainer.users)
      } catch (e) {
        console.log('error', e)
        setError("Error while loading posts");
      }
      setIsLoading(false);
    }
    postDetail()
  }, [])

  const addNewPost = async (postData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postData.addPostTitle,
          body: postData.addPostContent,
          userId: 1,
        }),
      });
      const newPost = await response.json();
      newPost.username = 'jane'
      setPost([...posts, newPost]);
    } catch (error) {
      console.error('Error adding new post:', error);
      setError('Error adding new post');
    }finally {
      setIsSubmitting(false);
    }
  };

  const deletePost = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`,
        {
          method: 'DELETE',
        });
      const deletedPost = await response.json()
      setPost(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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
  // console.log('hey')
  // console.log(posts)
  // console.log(users)
  return (
    <>

      <a href='#down' className='d-flex justify-content-end' ><FaArrowAltCircleDown className='down-arrow mt-3 ' /> </a>
      <div className='post-mess'  >
        {posts.map((postMessage) => {
          const { id, title, body } = postMessage;
          return (
            <div className='post-container' onClick={() => { NavigatePage(postMessage.id) }}>
              <div className="card">
                <div className="card-header d-flex justify-content-between " >{title}
                  <div> 
                    <FaEdit className="edit-comment fs-4 me-2" />
                    <MdDelete className="delete-post fs-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePost(postMessage.id)
                      }} /></div></div>

                <div className="card-body">
                  <p className="card-text">{body}</p>
                  <div className='userName'>
                    <a href='#' className='user btn btn-outline-secondary'>  {postMessage.username ? `By ${postMessage.username}` : "Unknown"}  </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <AddPost addNewPost={addNewPost} isSubmitting={isSubmitting} />
      <a href='#' className='d-flex justify-content-end' ><FaArrowAltCircleUp className='up-arrow mt-3 ' /> </a>
    </>
  )
}
export default Post;


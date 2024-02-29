import { useEffect, useState } from 'react';
import './Post.css'
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import gif from './Iphone-spinner-2.gif'

const Post = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [posts, setPost] = useState([])
  const [users, setUsers] = useState([])
  const [addPostTitle, setAddPostTitle] = useState('')
  const [addPostContent, setAddPostContent] = useState('')
  const [newUsername, setNewUsername] = useState('')

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

  const addPost = () => {
    const newPostObj = [...posts]
    newPostObj.push({
      id: posts.length + 1,
      title: addPostTitle,
      body: addPostContent,
      username: newUsername
    })
    setPost(newPostObj)
    setAddPostTitle('')
    setAddPostContent('')
    setNewUsername('')
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
  console.log('hey')
  console.log(posts)
  console.log(users)
  return (
    <>

      <a href='#down' className='d-flex justify-content-end' ><FaArrowAltCircleDown className='down-arrow mt-3 ' /> </a>
      <div className='post-mess'  >
        {posts.map((postMessage) => {
          const { title, body } = postMessage;
          return (
            <div className='post-container' onClick={() => { NavigatePage(postMessage.id) }}>
              <div className="card">
                <div className="card-header "  >{title} </div>
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

      <div className="post-box p-2 mt-3" id='down' >
        <div className="mt-3 fs-5">Add Post</div>
        <input className="input-post-title mb-3 mt-3" placeholder="Add title..." aaria-describedby="button-addon2" value={addPostTitle} onChange={(e) => setAddPostTitle(e.target.value)}></input>
        <textarea className="input-post-body mb-3" rows='4' placeholder="Add content..." aaria-describedby="button-addon2" value={addPostContent} onChange={(e) => setAddPostContent(e.target.value)}></textarea>
        <div className="d-flex align-items-center">
          <input className="input-username d-inline" placeholder="Add Username..." aaria-describedby="button-addon2" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          <button class="btn comment-btn ms-3 post-btn" type="button" id="button-addon2" onClick={addPost} > Submit </button>
        </div>
      </div>
      <a href='#' className='d-flex justify-content-end' ><FaArrowAltCircleUp className='up-arrow mt-3 ' /> </a>
    </>
  )
}
export default Post;


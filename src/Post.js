import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Post.css'
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [posts, setPost] = useState([])
  const [users, setusers] = useState([])

  useEffect(() => {
    async function postDetail() {
      setIsLoading(true);
      try {
        const postData = await fetch('https://dummyjson.com/posts')
        const usersData = await fetch('https://dummyjson.com/users')
        const data = await postData.json()
        const usersContainer = await usersData.json()
        const users = usersContainer.users || []
        console.log(users)
        const fetchedPosts = (data.posts || []).map((post) => {
          const user = users.find((user) => user.id === post.userId)
          return {
            ...post,
            username: user?.username,
          }
        })
        setPost(fetchedPosts)
        setusers(usersContainer.users)
      } catch (e) {
        console.log('error', e)
        setError("Error while loading posts");
      }
      setIsLoading(false);
    }
    postDetail()
  }, [])

  const NavigatePage = (pid) => {
    navigate(`/post/${pid}`)
  }


  if (isLoading) {
    return (
      <div className="container-fluid">
        <div>Loading...</div>
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
      <Navbar />
      <div className='post-mess'>
        {posts.map((postMessage) => {
          const { userId, title, body } = postMessage;
          return (
            <div className='post-container' onClick={() => { NavigatePage(postMessage.id) }}>
              <div className="card">
                <div className="card-header "  >
                  {title}
                </div>
                <div className="card-body">
                  <p className="card-text">{body}</p>
                  <div className='userName'>
                  <a href='#' className='user btn btn-outline-secondary'>  {postMessage.username ? `-By ${postMessage.username}` : "Unknown"}  </a>   
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Post;
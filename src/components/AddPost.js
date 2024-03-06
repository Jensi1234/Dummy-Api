import { useState } from "react";

const AddPost = ({ addNewPost, isSubmitting }) => {
  const [postData, setPostData] = useState({
    addPostTitle: '',
    addPostContent: '',
  });
  const addPost = () => {
    addNewPost(postData)
    setPostData({
      addPostTitle: '',
      addPostContent: '',
    })
  }
  
  return (
    <>
      <div className="post-box p-2 mt-3" id='down' >
        <div className="mt-3 fs-5">Add Post</div>
        <input className="input-post-title mb-3 mt-3"
          placeholder="Add title..."
          aaria-describedby="button-addon2"
          value={postData.addPostTitle}
          onChange={(e) => setPostData({ ...postData, addPostTitle: e.target.value })}
        ></input>
        <textarea className="input-post-body mb-3"
          rows='4'
          placeholder="Add content..."
          aaria-describedby="button-addon2"
          value={postData.addPostContent}
          onChange={(e) => setPostData({ ...postData, addPostContent: e.target.value })}
        ></textarea>
        <button className="btn comment-btn post-btn "
          type="button"
          id="button-addon2"
          onClick={addPost}
          disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </>
  )
}

export default AddPost;
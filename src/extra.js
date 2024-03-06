import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "./Images/Rounded blocks.gif";
import errorSymbol from "./Images/Error.gif";
import Addpost from "./AddPost";
function Posts() {
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handlePostClick = (postId) => {
    navigate(`/posts/comments/${postId}`, {
      state: { postData: postData[postId - 1] },
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const responseOfData = await fetch(
          "https://dummyjson.com/posts?limit=150"
        );
        const responseOfUsers = await fetch(
          "https://dummyjson.com/users?limit=100"
        );
        const pData = await responseOfData.json();
        const uData = await responseOfUsers.json();
        const users = uData.users || [];
        const fetchedPosts = (pData.posts || []).map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return {
            ...post,
            username: user ? user.username : "Unknown",
          };
        });
        setPostData(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error while fetching data");
        console.log("Error in fetching : ", error);
      }
    }
    fetchData();
  }, []);
  const onAddPost = (postDetail) => {
    setPostData([
      ...postData,
      {
        id: postDetail.postId,
        title: postDetail.title,
        body: postDetail.data,
        username: postDetail.name,
      },
    ]);
  };
  if (isLoading) {
    return (
      <div className="container text-center ">
        <img src={loader} alt="Loading ... " style={{ opacity: 0.5 }} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container w-50">
        <marquee>
          <img src={errorSymbol} alt="Loading ... " style={{ opacity: 0.5 }} />
          {error}
        </marquee>
      </div>
    );
  }
  return (
    <div className="container">
      <button className="btn btn-primary float-end my-2">
        <a href="#add" className="text-white text-decoration-none">
          Add post
        </a>
      </button>
      <div className="card card1">
        {postData.map((postData, index) => (
          <div
            key={index}
            className="post-data m-3 p-3 w-100"
            onClick={() => handlePostClick(postData.id)}
          >
            <div className="post-content card-body p-3 ">
              <h4 className="post-heading card-title">
                {postData.id}. {postData.title}
              </h4>
              <div className="card-text">{postData.body}</div>
            </div>
            <div className="postUser-name card-footer text-end">
              - By {postData.username}
            </div>
          </div>
        ))}
      </div>
      <div id="add">
        <Addpost onAddPost={onAddPost} />
      </div>
      <a href="#root">
        <button className="arrow m-3">
          <i className="fa fa-arrow-up"></i>
        </button>
      </a>
    </div>
  );
}
export default Posts;

import React, { useState } from "react";
function Addpost({ onAddPost }) {
  const [formData, setFormData] = useState({
    name: "",
    data: "",
    title: "",
    postId: 150,
  });
  const onValChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  function addComment(event) {
    event.preventDefault();
    onAddPost({ ...formData, postId: formData.postId + 1 });
    setFormData({ name: "", data: "", title: "", postId: formData.postId + 1 });
  }
  return (
    <div>
      <div className="add-post p-3 m-3">
        <h5 className="text-decoration-underline">Add posts !!</h5>
        <form className="d-flex align-items-center" onSubmit={addComment}>
          <div>
            <label htmlFor="title" className="fs-4">
              Title :
            </label>
            <input
              type="text"
              className="form-control box-shadow m-2 d-inline w-75"
              id="title"
              name="title"
              value={formData.title}
              onChange={onValChange}
              required
            />
          </div>
          <div className="d-flex flex-grow-1 align-items-center ">
            <label htmlFor="data" className="me-2">
              Data :
            </label>
            <textarea
              name="data"
              id="data"
              cols="20"
              rows="2"
              className="form-control box-shadow d-inline w-75"
              value={formData.data}
              onChange={onValChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              className="form-control box-shadow m-2 d-inline w-75"
              id="name"
              name="name"
              value={formData.name}
              onChange={onValChange}
              required
            />
          </div>
          <button className="btn btn-primary h-50" type="submit">
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
}
export default Addpost;
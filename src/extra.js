posts.js
import React, { useState, useEffect } from "react";
import Comments from "./Comments";
const Post = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState();
    const [selectedPost, setSelectedPost] = useState(null);
    useEffect(() => {
        const fetchedPostData = async () => {
            setIsLoading(true);
            try {
                const responsePost = await fetch("https://dummyjson.com/posts");
                const responseUser = await fetch("https://dummyjson.com/users");
                const data = await responsePost.json();
                const usersRes = await responseUser.json();
                const users = usersRes.users || [];
                const fetchedPosts = (data.posts || []).map((post) => {
                    const user = users.find((user) => user.id === post.userId);
                    return {
                        ...post,
                        username: user?.username,
                    };
                });
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching post data: ", error);
                setError("Error while loading posts");
            }
            setIsLoading(false);
        };
        fetchedPostData();
    }, []);
    const toggleCommentBox = (post) => {
        setSelectedPost(post);
    };
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
    return (
        <div className="container-fluid">
            {!selectedPost && (
                <div className="container-fluid">
                    {posts.map((post, index) => (
                        <div
                            key={index}
                            className="container-fluid my-4 d-flex flex-column p-3 post-container"
                            onClick={() => toggleCommentBox(post)}
                        >
                            <h3>
                                {post.id}. {post.title}
                            </h3>
                            <hr />
                            <p>{post.body}</p>
                            <p className="align-self-end">
                                {post.username ? `-By ${post.username}` : "Unknown"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            {selectedPost && (
                <Comments
                    post={selectedPost}
                    backToPost={() => toggleCommentBox(null)}
                />
            )}
        </div>
    );
};
export default Post;
12: 46
comments.js
import React, { useState, useEffect } from "react";
const Comments = ({ post, backToPost }) => {
    const [commentsData, setCommentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchedCommentData = async () => {
            try {
                const response = await fetch("https://dummyjson.com/comments/post/" + post.id);
                const commentsArray = await response.json();
                setCommentsData(commentsArray.comments);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comment data:", error);
                setLoading(false);
            }
        };
        fetchedCommentData();
    }, [post.id]);
    return (
        <div className="container-fluid">
            <div className="container-fluid mt-5 comments-container d-flex flex-column p-3">
                <div>
                    <div className="d-flex justify-content-between mt-3">
                        <h3>
                            {post.id}. {post.title}
                        </h3>
                        <button className="btn h-50 btn-primary" onClick={backToPost}>
                            Back to posts
                        </button>
                    </div>
                    <p className="mt-4">{post.body}</p>
                </div>
                {loading ? (
                    <div className="text-center">
                        <span
                            className="spinner-grow spinner-grow-sm mx-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="spinner-grow spinner-grow-sm mx-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="spinner-grow spinner-grow-sm mx-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    </div>
                ) : (
                    <>
                        {commentsData.length > 0 ? (
                            <div>
                                {commentsData.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="container-fluid d-flex flex-column"
                                    >
                                        <div className="mt-2 border border-dark p-3">
                                            <h4>{comment.body}</h4>
                                            <p className="text-end"> - By {comment.user.username}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h3>"</h3>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default Comments;
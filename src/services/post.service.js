export const getAllPost = async () => {
  const postData = await fetch('https://dummyjson.com/posts?limit=150')
  const postList = await postData.json()
  return postList;
}

export const getPostById = async (pid) => {
  const response = await fetch(`https://dummyjson.com/posts/${pid}`);
  const postData = await response.json();
  return postData
}

export const setNewPost = async (postData) => {
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
  return newPost
}

export const deletePostById = async (postId) => {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`,
    {
      method: 'DELETE',
    });
  const deletedPost = await response.json()
  return deletedPost;
}

export const updatedPostById = async (id, title,body ) => {
  const response = await fetch(`https://dummyjson.com/posts/${id}`,
    {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        body: body
      })
    })
  if (!response.ok) {
    throw new Error('Failed to add a new comment');
  }
  const newEditedPost = await response.json()
  return newEditedPost;
}


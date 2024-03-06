export const getCommentsPostById = async (pid) => {
  const commentData = await fetch(`https://dummyjson.com/posts/` + pid + `/comments`)
  const commentList = await commentData.json()
  return commentList
}

export const setNewComment = async (commentData, pid) => {
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
  return newComment
}

export const deleteCommentById = async (commentId) => {
  const response = await fetch(`https://dummyjson.com/comments/${commentId}`, {
    method: 'DELETE',
  });
  const deletedComment = await response.json()
  return deletedComment;
}

export const updatedCommentById = async (id,body) => {
  const response = await fetch(`https://dummyjson.com/comments/${id}`, {
    method: 'PUT', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    body: body,
  })
    })
  
  if (!response.ok) {
    throw new Error('Failed to add a new comment');
  }
  const newEditedComment = await response.json();
  return newEditedComment
}

export const getCommentsPostById = async (pid) => {
  const commentData = await fetch(`https://dummyjson.com/posts/` + pid + `/comments`)
  const commentList = await commentData.json()
  return commentList.comments
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

export const updatedCommentById = async (commentId,body) => {
  const response = await fetch(`https://dummyjson.com/comments/${commentId}`, {
    method: 'PUT', 
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    body: body,
  })
    })
  const newEditedComment = await response.json();
  return newEditedComment
}

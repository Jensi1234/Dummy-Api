import { useState } from "react";

const AddComment = ({ addNewComment, isSubmitting }) => {
  const [commentData, setCommentData] = useState({
    newComment: '',
  });
  const addComment = () => {
    addNewComment(commentData)
    setCommentData({
      newComment: '',
    })
  }

  return (
    <>
      <div className="comment-box p-2 mt-3">
        <div className="mt-3 fs-5">Add Comments</div>
        <textarea
          rows='4'
          className="input-comment my-3"
          placeholder="Share your opinion..."
          aria-describedby="button-addon2"
          value={commentData.newComment}
          onChange={(e) => setCommentData({ ...commentData, newComment: e.target.value })}
        ></textarea>
        <div className="d-flex align-items-center">
          <button
            className="btn comment-btn  comment-btn"
            type="button"
            id="button-addon2"
            onClick={addComment}
            disabled={isSubmitting} >
            {isSubmitting ? 'Commenting...' : 'Comment'}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddComment;


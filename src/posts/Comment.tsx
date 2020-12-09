import React from "react";
import { Comment as CommentInterface } from "../hackernews/api";

const Comment: React.FC<{ comment: CommentInterface }> = ({ comment }) => {
  const nestedComments = comment.children
    ? comment.children.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })
    : undefined;
  return (
    <React.Fragment>
      <div className="comments" style={commentStyle(comment.depth)}>
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
      </div>
      {nestedComments}
    </React.Fragment>
  );
};

const commentStyle = (depth: number) => {
  const paddingLeft = 10 * depth;
  return {
    padding: "8px",
    margin: `10px 10px 10px ${paddingLeft}px`,
    borderLeft: "0.5px solid hsl(201, 23%, 60%)",
  };
};

export default Comment;

import React from "react";
import { Comment } from "../hackernews/api";

export default function CommentComponent({ comment }: CommentProps) {
  const nestedComments = (comment.children || []).map((comment) => {
    return <CommentComponent key={comment.id} comment={comment} />;
  });
  return (
    <React.Fragment>
      <div className="comments" style={commentStyle(comment.depth)}>
        <p dangerouslySetInnerHTML={{ __html: comment.text }} />
      </div>
      {nestedComments}
    </React.Fragment>
  );
}

type CommentProps = {
  comment: Comment;
};

const commentStyle = (depth: number) => {
  const paddingLeft = 10 * depth;
  return {
    padding: "8px",
    margin: `10px 10px 10px ${paddingLeft}px`,
    borderLeft: "0.5px solid hsl(201, 23%, 60%)",
  };
};

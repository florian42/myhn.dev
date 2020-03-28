import React from 'react'
import PostMetaInfo from './PostMetaInfo';
import {Comment} from '../hackernews/api'


export default function CommentComponent({comment}: CommentProps) {
    const nestedComments = (comment.children || []).map(comment => {
        return <CommentComponent key={comment.id} comment={comment} />;
      });
    return (
        <React.Fragment>
        <div className="comments" style={commentStyle(comment.depth)}>
          <PostMetaInfo
            by={comment.by}
            time={comment.time}
            id={comment.id}
            descendants={comment.descendants}
          />
          <p dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
        {nestedComments}
      </React.Fragment>
    )
}

type CommentProps = {
    comment: Comment
}

const commentStyle = (depth: number) => {
    const paddingLeft = 10 * depth;
    return {
      background: "rgba(128, 128, 128, 0.1411764705882353)",
      padding: "10px",
      margin: `10px 10px 10px ${paddingLeft}px`,
      borderRadius: "5px"
    };
  };
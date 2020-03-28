import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import PostMetaInfo from './PostMetaInfo';
import CommentComponent from './Comment';
import Title from './Title';
import { fetchItem, fetchComments } from '../hackernews/api';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Comment, Story } from '../hackernews/api';

function PostComponent(props: PostComponentProps) {
  const { id } = queryString.parse(props.location.search);
  const [post, setPost] = useState<Story>();
  const [loadingPost, setLoadingPost] = useState(true);
  const [comments, setComments] = useState<Comment[]>();
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!Array.isArray(id) && id) {
      fetchItem(parseInt(id!))
        .then((post) => {
          setPost(post);
          setLoadingPost(false);
          return fetchComments(post.kids || [], 0);
        })
        .then((comments: Comment[]) => {
          setComments(comments);
          setLoadingComments(false);
        })
        .catch(({ message }) => {
          setError(message);
          setLoadingPost(false);
          setLoadingComments(false);
        });
    }
  }, [id]);

  if (error) {
    return <h1>Error!</h1>;
  }

  if (post !== undefined) {
    return (
      <React.Fragment>
        {loadingPost === true ? (
          <h1>Loading</h1>
        ) : (
          <React.Fragment>
            <h1 className='header'>
              <Title url={post.url} title={post.title} id={post.id} />
            </h1>
            <PostMetaInfo by={post.by} time={post.time} id={post.id} descendants={post.descendants} />
            <p dangerouslySetInnerHTML={{ __html: post.text }} />
          </React.Fragment>
        )}
        {loadingComments === true ? (
          loadingPost === false && <h1>Loading...</h1>
        ) : (
          <React.Fragment>
            {comments && comments.map((comment: Comment) => <CommentComponent key={comment.id} comment={comment} />)}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  return <h1>Nothing to show..</h1>;
}

interface PostComponentProps extends RouteComponentProps<{ location?: string }> {}

export default withRouter(PostComponent);

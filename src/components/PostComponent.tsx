import React, { useEffect } from 'react';
import queryString from 'query-string';
import PostMetaInfo from './PostMetaInfo';
import CommentComponent from './Comment';
import Title from './Title';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Comment, Story } from '../hackernews/api';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getComments, getStory } from '../actions/posts';

function PostComponent({ location, fetchComments, fetchStory, posts }: PostComponentProps) {
  const { id } = queryString.parse(location.search);

  const postId = !Array.isArray(id) && id ? parseInt(id) : null;

  const post = posts && Array.isArray(posts) ? posts.find((post) => post.id === postId) : null;

  const commentIds = post?.kids;

  useEffect(() => {
    if (commentIds) {
      if (!posts[0].comments) {
        fetchComments(commentIds);
      }
    }
  }, [commentIds, fetchComments, posts]);

  useEffect(() => {
    if (!post && postId) {
      fetchStory(postId);
    }
  }, [post, postId, fetchStory]);

  if (post !== undefined) {
    return (
      <React.Fragment>
        {!post ? (
          <h1>Loading post</h1>
        ) : (
          <React.Fragment>
              <Title url={post.url} title={post.title} id={post.id} />
            <PostMetaInfo id={post.id} descendants={post.descendants} />
            <p dangerouslySetInnerHTML={{ __html: post.text }} />
          </React.Fragment>
        )}
        {
          <React.Fragment>
            {post &&
              post.comments &&
              post.comments.length > 0 &&
              post.comments.map((comment: Comment) => <CommentComponent key={comment.id} comment={comment} />)}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

  return <h1>Nothing to show..</h1>;
}

export type PostComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{ location?: string }>;

const mapDispatchToProps = (dispatch: ThunkDispatch<{ posts: Story[] }, {}, Action>) => {
  return {
    fetchComments: (commentIds: number[]) => dispatch(getComments(commentIds)),
    fetchStory: (storyId: number) => dispatch(getStory(storyId)),
  };
};

const mapStateToProps = (state: { posts: Story[] }) => {
  return {
    posts: state.posts,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostComponent));

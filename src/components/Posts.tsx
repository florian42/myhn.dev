import React, { useEffect } from 'react';
import PostMetaInfo from './PostMetaInfo';
import Title from './Title';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getTopItems } from '../actions/posts';
import { Action } from 'redux';
import { withRouter } from 'react-router-dom';
import { Story } from '../hackernews/api';

function Posts({ posts, fetchMainPosts }: PostsProps) {

  useEffect(() => {
    if (!posts) {
      fetchMainPosts();
    }
  }, [fetchMainPosts, posts]);

  return (
    <ul>
      {posts && posts.length > 0 ? (
        posts.map((post: Story) => {
          return (
            <li key={post.id} className='post'>
              <Title url={post.url} title={post.title} id={post.id} />
              <PostMetaInfo by={post.by} time={post.time} id={post.id} descendants={post.descendants} />
            </li>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </ul>
  );
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Story[], {}, Action>) => {
  return {
    fetchMainPosts: () => dispatch(getTopItems()),
  };
};

const mapStateToProps = (state: { posts: [] }) => {
  return {
    posts: state.posts ? [...state.posts] : null,
  };
};

export type PostsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

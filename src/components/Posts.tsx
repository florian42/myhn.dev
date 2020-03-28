import React, { useEffect } from "react";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { PostsState } from "../reducer/posts";
import { fetchMainItems } from "../actions/posts";
import { Action } from "redux";
import { Story } from "../hackernews/api";
import { withRouter } from "react-router-dom";

function Posts({ posts, fetchMainPosts }: PostsProps) {
  useEffect(() => {
    fetchMainPosts();
  }, [fetchMainPosts]);

  return (
    <ul>
      {posts && posts.length > 0 ? (
        posts.map(post => {
          return (
            <li key={post.id} className="post">
              <Title url={post.url} title={post.title} id={post.id} />
              <PostMetaInfo
                by={post.by}
                time={post.time}
                id={post.id}
                descendants={post.descendants}
              />
            </li>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </ul>
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<PostsState, {}, Action>
) => {
  return {
    fetchMainPosts: () => dispatch(fetchMainItems())
  };
};

const mapStateToProps = (state: PostsState) => {
  return {
    posts: state.posts
  };
};

export type PostsProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    posts: Story[];
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

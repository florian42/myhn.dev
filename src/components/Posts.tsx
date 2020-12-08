import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMainPosts, Story } from "../hackernews/api";
import { fetchStories } from "../posts/postsSlice";
import { RootState } from "../reducer";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    async function fetchTopStories() {
      const posts = await fetchMainPosts("top");

      dispatch(fetchStories(posts));
    }

    if (!posts.length) {
      fetchTopStories();
    }
  }, [dispatch, posts]);

  return (
    <ul>
      {posts && posts.length > 0 ? (
        posts.map((post: Story) => {
          return (
            <li key={post.id} className="post">
              <Title url={post.url} title={post.title} id={post.id} />
              <PostMetaInfo id={post.id} descendants={post.descendants} />
            </li>
          );
        })
      ) : (
        <h1>Loading top 50 posts</h1>
      )}
    </ul>
  );
};

export default withRouter(Posts);

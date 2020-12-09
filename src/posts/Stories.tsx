import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMainPosts, Story } from "../hackernews/api";
import { fetchStories } from "./storiesSlice";
import { RootState } from "../reducer";
import StoryInfo from "./StoryInfo";
import Title from "./Title";
import Skeleton from "react-loading-skeleton";

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    async function fetchTopStories() {
      const posts = await fetchMainPosts("top");

      dispatch(fetchStories(posts));
    }

    if (stories.length < 2) {
      fetchTopStories();
    }
  }, [dispatch, stories]);

  return (
    <ul>
      {stories && stories.length > 0
        ? stories.map((post: Story) => {
            return (
              <li key={post.id} className="post">
                <Title url={post.url} title={post.title} id={post.id} />
                <StoryInfo id={post.id} descendants={post.descendants} />
              </li>
            );
          })
        : renderLoading()}
    </ul>
  );
};

function renderLoading() {
  return [...Array(25)].map((_item) => {
    return (
      <div style={{ padding: "8px" }}>
        <Skeleton width={400} />
        <Skeleton width={100} />
      </div>
    );
  });
}

export default withRouter(Posts);

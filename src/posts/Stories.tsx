import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { fetchMainPosts, Story } from "../hackernews/api";
import { fetchHottestStories } from "../lobsters/api";
import { RootState } from "../reducer";
import { fetchStories } from "./storiesSlice";
import StoryInfo from "./StoryInfo";
import Title from "./Title";

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state: RootState) => state.posts);

  const { site } = useParams<{ site: string }>();

  const fetchPosts =
    site === "lobsters"
      ? () => fetchHottestStories()
      : async () => fetchMainPosts();

  useEffect(() => {
    async function fetchTopStories() {
      const posts = await fetchPosts();
      if (site === "lobsters") {
        dispatch(fetchStories(posts));
      } else {
        dispatch(fetchStories(posts));
      }
    }

    if (stories.length < 2) {
      fetchTopStories();
    }
  }, [dispatch, fetchPosts, site, stories]);

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
  return [...Array(25)].map((_item, index) => {
    return (
      <div key={index} style={{ padding: "8px" }}>
        <Skeleton width={400} />
        <Skeleton width={100} />
      </div>
    );
  });
}

export default withRouter(Posts);

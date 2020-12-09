import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { fetchCommentsWithId, fetchItem } from "../hackernews/api";
import { fetchComments, fetchStory } from "./storiesSlice";
import { RootState } from "../reducer";
import StoryInfo from "./StoryInfo";
import Title from "./Title";
import Comment from "./Comment";
import Skeleton from "react-loading-skeleton";

const Story: React.FC<RouteComponentProps<{ location?: string }>> = ({
  location,
}) => {
  const dispatch = useDispatch();
  const stories = useSelector((state: RootState) => state.posts);
  const { id } = queryString.parse(location.search);

  const postId = !Array.isArray(id) && id ? parseInt(id) : null;

  const post =
    stories && Array.isArray(stories)
      ? stories.find((post) => post.id === postId)
      : null;

  const commentIds = post?.kids;

  useEffect(() => {
    async function getComments(commentIds: number[]) {
      const comments = await fetchCommentsWithId(commentIds, 0);
      dispatch(fetchComments(comments));
    }
    if (commentIds) {
      getComments(commentIds);
    }
  }, [commentIds, dispatch]);

  useEffect(() => {
    async function getStory(postId: number) {
      const post = await fetchItem(postId);
      dispatch(fetchStory(post));
    }
    if (!post && postId) {
      getStory(postId);
    }
  }, [post, postId, dispatch]);

  if (!post) {
    return (
      <div style={{ padding: "8px" }}>
        <Skeleton width={400} />
        <Skeleton width={100} />
      </div>
    );
  }

  if (post !== undefined) {
    return (
      <>
        <div className="post">
          <Title url={post.url} title={post.title} id={post.id} />
          <StoryInfo id={post.id} descendants={post.descendants} />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </div>
        <div className="comments">
          {post && post.comments && post.comments.length > 0
            ? post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            : renderLoading()}
        </div>
      </>
    );
  }

  return <h1>Nothing to show..</h1>;
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

export default withRouter(Story);

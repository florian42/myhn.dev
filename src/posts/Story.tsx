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
    return <h1>Loading post</h1>;
  }

  if (!post.comments) {
    return <h1>Loading comments</h1>;
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
          {post &&
            post.comments &&
            post.comments.length > 0 &&
            post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </div>
      </>
    );
  }

  return <h1>Nothing to show..</h1>;
};

export default withRouter(Story);

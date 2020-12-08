import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Comment, fetchCommentsWithId, fetchItem } from "../hackernews/api";
import { fetchComments, fetchStory } from "./postsSlice";
import { RootState } from "../reducer";
import CommentComponent from "./Comment";
import PostMetaInfo from "./PostMetaInfo";
import Title from "./Title";

const PostComponent: React.FC<RouteComponentProps<{ location?: string }>> = ({
  location,
}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const { id } = queryString.parse(location.search);

  const postId = !Array.isArray(id) && id ? parseInt(id) : null;

  const post =
    posts && Array.isArray(posts)
      ? posts.find((post) => post.id === postId)
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
          <PostMetaInfo id={post.id} descendants={post.descendants} />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </div>
        <div className="comments">
          {post &&
            post.comments &&
            post.comments.length > 0 &&
            post.comments.map((comment: Comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
        </div>
      </>
    );
  }

  return <h1>Nothing to show..</h1>;
};

export default withRouter(PostComponent);

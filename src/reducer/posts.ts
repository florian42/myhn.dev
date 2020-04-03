import { FETCH_ITEMS, FETCH_COMMENTS, PostActionTypes, FETCH_STORY } from '../actions/posts';
import { Story } from '../hackernews/api';

export default function posts(state: Story[] | null = null, action: PostActionTypes): Story[] | null {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items as Story[];
    case FETCH_COMMENTS:
      return state
        ? state.map((post) => {
            const commentsForPost = action.comments.filter((comment) => comment.parent === post.id);
            if (commentsForPost) {
              return {
                ...post,
                comments: commentsForPost,
              };
            }
            return post;
          })
        : state;
    case FETCH_STORY:
      return state ? state.concat([action.story]) : [action.story];
    default:
      return state;
  }
}

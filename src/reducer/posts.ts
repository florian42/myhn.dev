import { FETCH_ITEMS, PostActionTypes } from '../actions/posts';
import { Story } from '../hackernews/api';

export default function posts(state = {}, action: PostActionTypes) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.items;
    default:
      return state;
  }
}

export interface PostsState {
  posts: Story[];
}

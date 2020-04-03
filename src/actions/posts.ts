import { fetchMainPosts, Item, Comment, fetchComments, Story, fetchItem } from '../hackernews/api';
import { Dispatch } from 'redux';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_STORY = 'FETCH_STORY';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

interface FetchItemsAction {
  type: typeof FETCH_ITEMS;
  items: Item[];
}

interface FetchStoryAction {
  type: typeof FETCH_STORY;
  story: Story;
}

interface FetchCommentsAction {
  type: typeof FETCH_COMMENTS;
  comments: Comment[];
}

export function fetchItemsSuccessful(items: Item[]): FetchItemsAction {
  return {
    type: FETCH_ITEMS,
    items,
  };
}

export function fetchStorySuccessful(story: Story): FetchStoryAction {
  return {
    type: FETCH_STORY,
    story,
  };
}

export function fetchCommentsSuccessful(comments: Comment[]): FetchCommentsAction {
  return {
    type: FETCH_COMMENTS,
    comments,
  };
}

export const getTopItems = () => async (dispatch: Dispatch) => {
  const posts = await fetchMainPosts('top');
  dispatch(fetchItemsSuccessful(posts));
};

export const getStory = (itemId: number) => async (dispatch: Dispatch) => {
  const post = await fetchItem(itemId);
  dispatch(fetchStorySuccessful(post));
};

export const getComments = (commentIds: number[]) => async (dispatch: Dispatch) => {
  const comments = await fetchComments(commentIds, 0);
  dispatch(fetchCommentsSuccessful(comments));
};

export type PostActionTypes = FetchItemsAction | FetchCommentsAction | FetchStoryAction;

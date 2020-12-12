import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Story } from "../hackernews/api";

interface StoriesState {
  stories: Story[];
  error: string | null;
  loading: boolean;
}

const initialState: StoriesState = {
  stories: [],
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchStoriesSuccess(_state, action: PayloadAction<Story[]>) {
      return {
        stories: action.payload,
        error: null,
        loading: false,
      };
    },
    fetchStoriesFailed(state, action: PayloadAction<Error>) {
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    },
    fetchStoriesStarted(state) {
      return {
        ...state,
        loading: true,
      };
    },
    fetchComments(state, action: PayloadAction<Comment[]>) {
      state.stories.forEach((story) => {
        const comments = action.payload.filter(
          (comment) => comment.parent === story.id
        );
        if (comments) {
          story.comments = comments;
        }
      });
    },
    fetchStory(state, action: PayloadAction<Story>) {
      state.stories.push(action.payload);
    },
  },
});

export const {
  fetchStoriesSuccess,
  fetchStoriesFailed,
  fetchStoriesStarted,
  fetchComments,
  fetchStory,
} = postsSlice.actions;

export default postsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story, Comment } from "../hackernews/api";

const postsSlice = createSlice({
  name: "posts",
  initialState: [] as Story[],
  reducers: {
    fetchStories(_state, action: PayloadAction<Story[]>) {
      console.log("got dispatched");

      return action.payload;
    },
    fetchComments(state, action: PayloadAction<Comment[]>) {
      state.forEach((story) => {
        const comments = action.payload.filter(
          (comment) => comment.parent === story.id
        );
        if (comments) {
          story.comments = comments;
        }
      });
    },
    fetchStory(state, action: PayloadAction<Story>) {
      state.push(action.payload);
    },
  },
});

export const { fetchStories, fetchComments, fetchStory } = postsSlice.actions;

export default postsSlice.reducer;

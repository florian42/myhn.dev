import { combineReducers } from "redux";
import postsReducer from "../posts/storiesSlice";
import appReducer from "../appSlice";

const rootReducer = combineReducers({
  app: appReducer,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

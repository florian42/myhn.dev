import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { selectedSite: "hn" },
  reducers: {
    selectSite(_state, action: PayloadAction<string>) {
      return {
        selectedSite: action.payload,
      };
    },
  },
});

export const { selectSite } = appSlice.actions;

export default appSlice.reducer;

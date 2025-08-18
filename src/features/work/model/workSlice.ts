import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WorkState = {
  activeModule: number; // 1, 2, 3
};

const initialState: WorkState = {
  activeModule: 1,
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    setActiveModule: (state, action: PayloadAction<number>) => {
      state.activeModule = action.payload;
    },
  },
});

export const { setActiveModule } = workSlice.actions;
export default workSlice.reducer;

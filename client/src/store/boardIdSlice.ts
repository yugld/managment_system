import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardState {
  boardId: number;
}
const initialState: BoardState = {
  boardId: 0,
};
const boardIdSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardId(state, action: PayloadAction<number>) {
      state.boardId = action.payload;
    },
  },
});

export const { setBoardId } = boardIdSlice.actions;
export default boardIdSlice.reducer;

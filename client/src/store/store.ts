import { configureStore } from '@reduxjs/toolkit';
import api from '@store/api';
import boardIdReducer from '@store/boardIdSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    board: boardIdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

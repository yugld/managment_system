import { configureStore } from '@reduxjs/toolkit';
import api from '@store/api';
import boardIdReducer from '@store/boardIdSlice';

describe('Redux Store', () => {
  it('Должен инициализировать с корректными reducers', () => {
    const store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        board: boardIdReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    const state = store.getState();
    expect(state).toHaveProperty('board');
    expect(state).toHaveProperty('api');
  });
});

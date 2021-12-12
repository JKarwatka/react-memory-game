import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable';
import boardReducer from './board/slices';
import gameReducer from './game/slices';
import { rootEpic } from './rootEpic';


const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
})

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import boardReducer from './board/slice';
import gameReducer from './game/slice';


export const store = configureStore({
  reducer: {
    board: boardReducer,
    game: gameReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
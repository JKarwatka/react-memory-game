import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_NUM_OF_PAIRS } from '../../utils/consts'
import { GameState } from '../../utils/enums'
import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getCurrentGameState } from './selectors'
import { areCardsMatching, generateBoard, generateOrder } from '../../utils/helpers'
import { getRevealedCards } from '../board/selectors'
import { hideCard, initializeBoard, initializeOrder, removeCard } from '../board/slices'

interface gameState {
  currentState: GameState,
  numOfPairs: number
}

const initialState: gameState = {
  currentState: GameState.PICKING_CARD,
  numOfPairs: DEFAULT_NUM_OF_PAIRS
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeGameState: (state, action: PayloadAction<GameState>) => {
      state.currentState = action.payload
    },
  },
})

export const { changeGameState } = gameSlice.actions

export default gameSlice.reducer


export const gameStateChanged = (gameState: GameState): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const state = getState()
  const currState = getCurrentGameState(state)
  switch (gameState) {

  }
}

export const initializeGame = (numOfPairs: number): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const state = getState()
  const cards = generateBoard(numOfPairs)
  const order = generateOrder(Object.keys(cards))

  dispatch(initializeBoard(cards))
  dispatch(initializeOrder(order))
}


import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_NUM_OF_PAIRS } from '../../utils/consts'
import { GameState } from '../../utils/enums'
import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getCurrentGameState } from './selectors'
import { areCardsMatching, generateBoard, generateOrder } from '../../utils/helpers'
import { areAllCardsRemoved, getRevealedCards } from '../board/selectors'
import { boardSlice, hideCard, setupCards, setupCardsOrder, removeCard } from '../board/slice'

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


export const initializeGame = (numOfPairs: number): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  const cards = generateBoard(numOfPairs)
  const order = generateOrder(Object.keys(cards))

  dispatch(setupCards(cards))
  dispatch(setupCardsOrder(order))
}

export const gameStateChanged = (gameState: GameState): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const state = getState()
  const currState = getCurrentGameState(state)
  switch (gameState) {
    case GameState.MATCHING_CARDS: {
      const revealedCards = getRevealedCards(state)
      if (areCardsMatching(revealedCards)) {

        setTimeout(() => {
          revealedCards.forEach(card => dispatch(removeCard(card.id)))
          dispatch(changeGameState(GameState.PICKING_CARD))
        }, 500)
      }
      else {
        setTimeout(() => {
          revealedCards.forEach(card => dispatch(hideCard(card.id)))
          dispatch(changeGameState(GameState.PICKING_CARD))
        }, 500)
      }
      return
    }

    case GameState.PICKING_CARD: {
      const allCardsRemoved = areAllCardsRemoved(state)
      if (allCardsRemoved) {
        dispatch(gameStateChanged(GameState.GAME_OVER))
      }
      return
    }

    case GameState.GAME_OVER: {
      dispatch(initializeGame(DEFAULT_NUM_OF_PAIRS))
      return
    }
  }
}

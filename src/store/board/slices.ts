import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_NUM_OF_PAIRS } from '../../utils/consts'
import { GameState, MemoryCardState } from '../../utils/enums'
import { generateBoard } from '../../utils/helpers'
import { CardId, MemoryCardData } from '../../utils/interfaces'
import { getCurrentGameState, getNumOfPairs } from '../game/selectors'
import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getNumOfRevealedCards, getRevealedCards } from './selectors'
import { gameSlice } from '../game/slices'

interface BoardState {
  cards: MemoryCardData[]
}


const initialState: BoardState = {
  cards: generateBoard(DEFAULT_NUM_OF_PAIRS)
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    revealCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards
        .map(card =>
          card.id === action.payload
            ? ({
              ...card,
              cardState: MemoryCardState.FaceUp
            })
            : card
        )
    },
    hideCard: (state, action: PayloadAction<string>) => {
      state.cards
        .map(card =>
          card.id === action.payload
            ? ({
              ...card,
              cardState: MemoryCardState.FaceDown
            })
            : card
        )
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards
        .map(card =>
          card.id === action.payload
            ? ({
              ...card,
              cardState: MemoryCardState.Removed
            })
            : card
        )
    },
  },
})

export const { revealCard, hideCard } = boardSlice.actions

export const cardClicked = (id: CardId): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const state = getState()
  const currState = getCurrentGameState(state)
  switch (currState) {
    case GameState.PICKING_CARD: {
      const numOfRevealedCards = getNumOfRevealedCards(state)

      if (numOfRevealedCards >= 2) {
        dispatch(boardSlice.actions.revealCard(id))
        dispatch(gameSlice.actions.changeGameState(GameState.MATCHING_CARDS))
      }
      else {
        dispatch(boardSlice.actions.revealCard(id))
        dispatch(gameSlice.actions.changeGameState(GameState.PICKING_CARD))
      }
      return
    }
  }
}



export default boardSlice.reducer



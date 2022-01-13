import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, FlippableCardState } from '../../utils/enums'
import { Board, CardId } from '../../utils/types'
import { getCurrentGameState } from '../game/selectors'
import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getNumOfRevealedCards, isCardRevealed } from './selectors'
import { changeGameState, gameStateChanged } from '../game/slice'

interface BoardState {
  cards: Board,
  cardsOrder: CardId[]
}


export const initialState: BoardState = {
  cards: {},
  cardsOrder: []
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    revealCard: (state, action: PayloadAction<CardId>) => {
      state.cards[action.payload].cardState = FlippableCardState.FaceUp
    },
    hideCard: (state, action: PayloadAction<CardId>) => {
      state.cards[action.payload].cardState = FlippableCardState.FaceDown
    },
    removeCard: (state, action: PayloadAction<CardId>) => {
      state.cards[action.payload].cardState = FlippableCardState.Removed
    },
    setupCards: (state, action: PayloadAction<Board>) => {
      state.cards = action.payload
    },
    setupCardsOrder: (state, action: PayloadAction<CardId[]>) => {
      state.cardsOrder = action.payload
    },
  },
})

export const cardClicked = (id: CardId): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const state = getState()
  const currState = getCurrentGameState(state)

  const cardRevealed = isCardRevealed(id)(state)

  if (!cardRevealed && currState === GameState.PICKING_CARD) {
    const numOfRevealedCards = getNumOfRevealedCards(state)
    dispatch(boardSlice.actions.revealCard(id))

    if (numOfRevealedCards === 1) {
      dispatch(changeGameState(GameState.MATCHING_CARDS))
      dispatch(gameStateChanged(GameState.MATCHING_CARDS))

    }
  }
}

export const { revealCard, hideCard, removeCard, setupCards, setupCardsOrder } = boardSlice.actions

export default boardSlice.reducer



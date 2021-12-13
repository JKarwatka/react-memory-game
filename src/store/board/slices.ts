import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_NUM_OF_PAIRS } from '../../utils/consts'
import { GameState, MemoryCardState } from '../../utils/enums'
import { areCardsMatching, generateBoard } from '../../utils/helpers'
import { Board, CardId, MemoryCardData } from '../../utils/interfaces'
import { getCurrentGameState, getNumOfPairs } from '../game/selectors'
import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getNumOfRevealedCards, getRevealedCards, isCardAlreadyRevealed } from './selectors'
import { changeGameState, gameSlice, gameStateChanged } from '../game/slices'

interface BoardState {
  cards: Board,
  cardsOrder: CardId[]
}


const initialState: BoardState = {
  cards: {},
  cardsOrder: []
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    revealCard: (state, action: PayloadAction<string>) => {
      state.cards[action.payload].cardState = MemoryCardState.FaceUp
    },
    hideCard: (state, action: PayloadAction<string>) => {
      state.cards[action.payload].cardState = MemoryCardState.FaceDown
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards[action.payload].cardState = MemoryCardState.Removed
    },
    initializeBoard: (state, action: PayloadAction<Board>) => {
      state.cards = action.payload
    },
    initializeOrder: (state, action: PayloadAction<CardId[]>) => {
      state.cardsOrder = action.payload
    },
  },
})

export const { revealCard, hideCard, removeCard, initializeBoard, initializeOrder } = boardSlice.actions

export const cardClicked = (id: CardId): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const state = getState()
  const currState = getCurrentGameState(state)


  const isCardRevealed = isCardAlreadyRevealed(id)
  if (!isCardRevealed) {
    switch (currState) {
      case GameState.PICKING_CARD: {
        const revealedCards = getRevealedCards(state)
        const numOfRevealedCards = getNumOfRevealedCards(state)



        if (numOfRevealedCards === 1) {
          dispatch(boardSlice.actions.revealCard(id))
          dispatch(changeGameState(GameState.MATCHING_CARDS))
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
        }
        else {
          dispatch(boardSlice.actions.revealCard(id))
        }
        return
      }
    }
  }
}



export default boardSlice.reducer



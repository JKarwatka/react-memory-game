import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { generateBoard } from '../../utils/generateBoard'
import { MemoryCardData } from '../../utils/MemoryCardData'
import { MemoryCardState } from '../../utils/MemoryCardState'

interface BoardState {
  cards: MemoryCardData[]
}

const GRID_SIZE = 8
const initialState: BoardState = {
  cards: generateBoard(GRID_SIZE)
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
  },
})

export const { revealCard, hideCard } = boardSlice.actions

export default boardSlice.reducer
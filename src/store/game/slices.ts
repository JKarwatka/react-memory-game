import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_NUM_OF_PAIRS } from '../../utils/consts'
import { GameState } from '../../utils/enums'

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

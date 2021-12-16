import { RootState } from "../store";

export const getNumOfPairs = (state: RootState) => state.game.numOfPairs

export const getCurrentGameState = (state: RootState) => state.game.currentState

import { createSelector } from "reselect";
import { MemoryCardState } from "../../utils/enums";
import { MemoryCardData } from "../../utils/interfaces";
import { RootState } from "../store";

export const getCards = (state: RootState) => state.board.cards

export const getRevealedCards = createSelector(getCards, cards =>
  cards.reduce(
    (acc, card) =>
      card.cardState === MemoryCardState.FaceUp
        ? [...acc, card]
        : acc,
    [] as MemoryCardData[]
  )
)

export const getNumOfRevealedCards = createSelector(getCards, cards =>
  cards.reduce(
    (acc, card) =>
      card.cardState === MemoryCardState.FaceUp
        ? acc + 1
        : acc,
    0
  )
)
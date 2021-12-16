
import { createSelector } from "reselect";
import { MemoryCardState } from "../../utils/enums";
import { CardId, MemoryCardData } from "../../utils/types";
import { getNumOfPairs } from "../game/selectors";
import { RootState } from "../store";

export const getCards = (state: RootState) => state.board.cards

export const getCardsOrder = (state: RootState) => state.board.cardsOrder

export const getCardById = (id: CardId) => (state: RootState) => state.board.cards[id]


export const isCardRevealed = (id: CardId) => createSelector(getCardById(id), card => card.cardState === MemoryCardState.FaceUp)


export const getCardsInOrder = createSelector(getCardsOrder, getCards, (cardsIds, cards) => cardsIds.map(id => cards[id]))

export const getCardsArray = createSelector(getCards, cards => Object.values(cards))

export const getRevealedCards = createSelector(getCardsArray, cards =>
  cards.reduce(
    (acc, card) =>
      card.cardState === MemoryCardState.FaceUp
        ? [...acc, card]
        : acc,
    [] as MemoryCardData[]
  )
)

export const getNumOfRevealedCards = createSelector(getRevealedCards, cards => cards.length)

export const areAllCardsRemoved = createSelector(getNumOfRevealedCards, getNumOfPairs, (numOfRevealedCards, numOfPairs) => numOfRevealedCards === numOfPairs)
import { MemoryCardState } from '../../utils/enums'
import { generateBoard, generateCard } from '../../utils/helpers'
import { getCardById } from './selectors'
import boardReducer, { boardSlice, hideCard, removeCard, revealCard } from './slices'

describe('boardSlice', () => {

  test.each([
    [
      'FaceUp',
      'revealCard',
      {
        cardId: 'id',
        initialCardState: MemoryCardState.FaceDown,
        action: revealCard,
        expectedResult: MemoryCardState.FaceUp
      }
    ],
    [
      'FaceDown',
      'hideCard',
      {
        cardId: 'id',
        initialCardState: MemoryCardState.FaceUp,
        action: hideCard,
        expectedResult: MemoryCardState.FaceDown,
      }
    ],
    [
      'Removed',
      'removeCard',
      {
        cardId: 'id',
        initialCardState: MemoryCardState.FaceDown,
        action: removeCard,
        expectedResult: MemoryCardState.Removed,
      }
    ],

  ])('should set cardState to %s when %s action with given card id is called',
    (_, __, { cardId, initialCardState, action, expectedResult }) => {
      const initialState = {
        cards: {
          [cardId]: generateCard(cardId, 'img', initialCardState)
        },
        cardsOrder: [cardId]
      }

      const result = boardReducer(initialState, action(cardId))

      const cardState = result.cards[cardId].cardState

      expect(cardState).toEqual(expectedResult)
    }
  )
})
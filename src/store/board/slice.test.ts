import { FlippableCardState } from '../../utils/enums'
import { generateBoard, generateCard } from '../../utils/helpers'
import boardReducer, { hideCard, removeCard, revealCard, setupCards, setupCardsOrder } from './slice'

describe('boardSlice', () => {

  const defaultState = {
    cards: {},
    cardsOrder: []
  }

  test.each([
    [
      'FaceUp',
      'revealCard',
      {
        cardId: 'id',
        initialCardState: FlippableCardState.FaceDown,
        action: revealCard,
        expectedResult: FlippableCardState.FaceUp
      }
    ],
    [
      'FaceDown',
      'hideCard',
      {
        cardId: 'id',
        initialCardState: FlippableCardState.FaceUp,
        action: hideCard,
        expectedResult: FlippableCardState.FaceDown,
      }
    ],
    [
      'Removed',
      'removeCard',
      {
        cardId: 'id',
        initialCardState: FlippableCardState.FaceDown,
        action: removeCard,
        expectedResult: FlippableCardState.Removed,
      }
    ],

  ])('should set cardState to %s when %s action with given card id is called',
    (_, __, { cardId, initialCardState, action, expectedResult }) => {
      const initialState = {
        ...defaultState,
        cards: {
          [cardId]: generateCard(cardId, 'img', initialCardState)
        }
      }

      const result = boardReducer(initialState, action(cardId))

      const cardState = result.cards[cardId].cardState

      expect(cardState).toEqual(expectedResult)
    }
  )


  it('should setup cards with given payload when setupCards action is called', () => {
    const initialState = {
      ...defaultState
    }
    const cardId = 'test'
    const actionPayload = {
      [cardId]: generateCard(cardId, 'img', FlippableCardState.FaceDown),
    }

    const result = boardReducer(initialState, setupCards(actionPayload))

    expect(result.cards).toEqual(actionPayload)
  })

  it('should setup cards order with given payload when setupCardsOrder action is called', () => {
    const initialState = {
      ...defaultState
    }
    const cardId = 'test'
    const actionPayload = [cardId]

    const result = boardReducer(initialState, setupCardsOrder(actionPayload))

    expect(result.cardsOrder).toEqual(actionPayload)
  })
})

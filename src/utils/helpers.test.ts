import { MemoryCardState } from "./enums"
import { areCardsMatching, generateBoard, generateCard, generateIds, getCardImage } from "./helpers"
import { MemoryCardData } from "./types"

describe('helpers', () => {
  describe('generateBoard', () => {

    test.each([
      [12, 6],
      [2, 1],
      [30, 15]
    ])('should contain %i elements on board when number of pairs is %i', (numOfCards, numOfPairs) => {
      const result = generateBoard(numOfPairs)

      const elements = Object.values(result)

      expect(elements.length).toBe(numOfCards)
    })


    it('should contain 2 cards with the same image', () => {
      const numOfPairs = 8

      const hasCompletePairs = (array: MemoryCardData[]) => {
        const counts = array.reduce(
          (acc, item) =>
            acc.set(
              item.img,
              acc.get(item.img)
                ? acc.get(item.img) + 1
                : 1
            ),
          new Map<string, number>()
        )

        return Object.values(counts).every(count => count === 2)
      }

      const result = Object.values(generateBoard(numOfPairs))

      expect(hasCompletePairs(result)).toBe(true)
    })
  })

  describe('generateIds', () => {
    test.each([
      1, 7, 10, 20
    ])('should generate array of %i unique ids', (arrLength) => {
      const result = generateIds(arrLength)

      const hasUniqueElements = new Set(result).size === result.length

      expect(result.length).toBe(arrLength)
      expect(hasUniqueElements).toBeTruthy()
    })

  })

  describe('areCardsMatching', () => {
    test.each([
      [true, 'are', [generateCard('testId1', 'machingImg', MemoryCardState.FaceDown), generateCard('testId2', 'machingImg', MemoryCardState.FaceDown)]],
      [false, 'are not', [generateCard('testId1', 'testImg', MemoryCardState.FaceDown), generateCard('testId2', 'differentImg', MemoryCardState.FaceDown)]]
    ])('should return %s when cards %s matching', (expectedResult, _, array) => {
      const result = areCardsMatching(array)

      expect(result).toBe(expectedResult)
    })
  })

  describe('generateCard', () => {
    it('should properly generate card', () => {

      const cardData = {
        id: 'testId',
        img: 'testImg',
        cardState: MemoryCardState.FaceDown
      }
      const result = generateCard(cardData.id, cardData.img, cardData.cardState)

      expect(result).toEqual(cardData)
    })
  })
})

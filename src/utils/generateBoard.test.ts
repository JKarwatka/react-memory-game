import { generateBoard } from "./generateBoard"
import { MemoryCardData } from "./MemoryCardData"

describe('generateBoard', () => {

  test.each([
    [12, 6],
    [2, 1],
    [30, 15]
  ])('should contain %i elements on board when number of pairs is %i', (numOfCards, numOfPairs) => {
    const result = generateBoard(numOfPairs)
    expect(result.length).toBe(numOfCards)
  })


  it('should contain 2 cards with the same image', () => {
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

    const result = generateBoard(8)

    expect(hasCompletePairs(result)).toBe(true)
  })
})

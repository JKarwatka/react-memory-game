import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { CARD_NAMES } from './consts'
import { MemoryCardState } from './enums'
import { Board, CardId, MemoryCardData } from './interfaces'

export const generateBoard = (numOfPairs: number) => {
  const images = _.sampleSize(CARD_NAMES, numOfPairs)
  const board: Board = {}

  const ids = generateIds(numOfPairs * 2)

  ids.forEach(
    (id, i) =>
      board[id] = generateCard(id, images[i % numOfPairs], MemoryCardState.FaceDown)
  )

  return board
}

export const getCardImage = (imgName: string) => `${process.env.PUBLIC_URL}/img/${imgName}`


export const areCardsMatching = (cards: MemoryCardData[]) =>
  cards
    .map(card => card.img)
    .every((img, _, arr) => img === arr[0])


export const generateIds = (num: number) =>
  Array.from(new Array(num)).map(_ => uuidv4())

export const generateOrder = (orderArr: CardId[]): CardId[] => orderArr.sort(() => Math.random() - 0.5)

export const generateCard = (id: CardId, img: string, cardState: MemoryCardState): MemoryCardData => ({
  id,
  img,
  cardState
})



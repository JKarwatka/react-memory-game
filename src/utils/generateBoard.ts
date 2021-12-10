import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { CARD_NAMES } from './cardNames'
import { MemoryCardState } from './MemoryCardState'

export const generateBoard = (size: number) => {
  const images = _.sampleSize(CARD_NAMES, size)

  return new Array(size * 2)
    .fill(0)
    .map((_, i) => ({
      id: uuidv4(),
      img: images[i % size],
      cardState: MemoryCardState.FaceDown
    }))
    .sort(() => Math.random() - 0.5)
}

import { Theme } from "@mui/material"
import { SxProps } from "@mui/system"
import { MemoryCardState } from "../../utils/enums"

const flipCardTransition = {
  type: 'spring',
  rotateY: { duration: 0.4 }
}

const hideCardTransition = {
  type: 'spring',
  opacity: { duration: 0.2 },
  translateZ: { duration: 0.3 }
}

export const enlargeCardTransition = {
  scale: 1.05,
  transition: { duration: 0.1 }
}

export const frontVariants = {
  [MemoryCardState.FaceUp]: {
    opacity: 1,
    rotateY: 0,
    translateZ: 0,
    transition: flipCardTransition
  },
  [MemoryCardState.FaceDown]: {
    opacity: 1,
    rotateY: 180,
    translateZ: 0,
    transition: flipCardTransition
  },

  [MemoryCardState.Removed]: {
    opacity: 0,
    rotateY: 0,
    translateZ: '-1100px',
    transition: hideCardTransition
  }
}

export const backVariants = {
  [MemoryCardState.FaceUp]: {
    opacity: 1,
    rotateY: 180,
    translateZ: 0,
    transition: flipCardTransition
  },
  [MemoryCardState.FaceDown]: {
    opacity: 1,
    rotateY: 0,
    translateZ: 0,
    transition: flipCardTransition
  },

  [MemoryCardState.Removed]: {
    opacity: 0,
    rotateY: 180,
    translateZ: -1100,
    transition: hideCardTransition
  }
}

export const paperStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
  height: '100%',
  width: '100%',
  position: "absolute",
  backfaceVisibility: 'hidden'
}

export const containerStyles = {
  position: "relative",
  height: 200,
  width: 200,
  padding: 1,
  perspective: 500,
}
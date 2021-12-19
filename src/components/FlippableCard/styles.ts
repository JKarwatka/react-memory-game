import { Theme } from "@mui/material"
import { SxProps } from "@mui/system"
import { MemoryCardState } from "../../utils/enums"

export const frontVariants = {
  [MemoryCardState.FaceUp]: {
    opacity: 1,
    rotateY: 0,
    translateZ: 0,
    transition: {
      type: 'spring',
      rotateY: { duration: 0.4 }
    }
  },
  [MemoryCardState.FaceDown]: {
    opacity: 1,
    rotateY: 180,
    translateZ: 0,
    transition: {
      type: 'spring',
      rotateY: { duration: 0.4 }
    }
  },

  [MemoryCardState.Removed]: {
    opacity: 0,
    rotateY: 0,
    translateZ: '-1100px',
    transition: {
      type: 'spring',
      opacity: { duration: 0.2 },
      translateZ: { duration: 0.3 }
    }
  }
}

export const backVariants = {
  [MemoryCardState.FaceUp]: {
    opacity: 1,
    rotateY: 180,
    translateZ: 0,
    transition: {
      type: 'spring',
      rotateY: { duration: 0.4 }
    }
  },
  [MemoryCardState.FaceDown]: {
    opacity: 1,
    rotateY: 0,
    translateZ: 0,
    transition: {
      type: 'spring',
      rotateY: { duration: 0.4 }
    }
  },

  [MemoryCardState.Removed]: {
    opacity: 0,
    rotateY: 180,
    translateZ: -1100,
    transition: {
      type: 'spring',
      opacity: { duration: 0.2 },
      translateZ: { duration: 0.3 }
    }
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

export const containerStyles: SxProps<Theme> | undefined = {
  position: "relative",
  height: 200,
  width: 200,
  padding: 1,
  perspective: 500,
}
import React from 'react'
import { Box } from '@mui/system'
import { MemoryCard } from '../MemoryCard'
import { getCardImage } from '../../utils/getCardImage'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { revealCard } from '../../store/slices/boardSlice'
import { CARD_BACK } from '../../utils/cardNames'

export const Board = () => {
  const cards = useSelector((state: RootState) => state.board.cards)
  const dispatch = useDispatch()

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
    }}>
      {cards.map(({ img, cardState, id }) =>
        <MemoryCard
          key={id}
          img={getCardImage(img)}
          onClick={() => dispatch(revealCard(id))}
          cardState={cardState}
          id={id}
          cardBack={getCardImage(CARD_BACK)}
        />
      )}
    </Box>
  )
}

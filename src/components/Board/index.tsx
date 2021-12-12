import React from 'react'
import { Box } from '@mui/system'
import { MemoryCard } from '../MemoryCard'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { getCardImage } from '../../utils/helpers'
import { CARD_BACK } from '../../utils/consts'
import { cardClicked } from '../../store/board/slices'


export const Board = () => {
  const cards = useAppSelector((state: RootState) => state.board.cards)
  const dispatch = useAppDispatch()

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
    }}>
      {cards.map(({ img, cardState, id }) =>
        <MemoryCard
          key={id}
          img={getCardImage(img)}
          onClick={() => dispatch(cardClicked(id))}
          cardState={cardState}
          id={id}
          cardBack={getCardImage(CARD_BACK)}
        />
      )}
    </Box>
  )
}

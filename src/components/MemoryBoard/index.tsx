import React from 'react'
import { Box } from '@mui/system'
import { MemoryCard } from '../MemoryCard'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getCardImage } from '../../utils/helpers'
import { CARD_BACK } from '../../utils/consts'
import { getCardsInOrder } from '../../store/board/selectors'
import { MemoryCardData } from '../../utils/types'
import { cardClicked } from '../../store/board/slice'

//TODO: move card_back to state and get it through selector
//TODO: move styles to theme or separate file
export const MemoryBoard = () => {
  const cards: MemoryCardData[] = useAppSelector(getCardsInOrder)
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

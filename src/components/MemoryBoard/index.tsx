import React from 'react'
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { CARD_BACK } from '../../utils/consts'
import { getCardsInOrder } from '../../store/board/selectors'
import { MemoryCardData } from '../../utils/types'
import { cardClicked } from '../../store/board/slice'
import { FilippableCard } from '../FlippableCard'
import { CardImage } from '../FlippableCard/atoms'
import { getCardImage } from '../../utils/helpers'

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
        <FilippableCard
          key={id}
          FrontContent={() => <CardImage src={getCardImage(img)} />}
          BackContent={() => <CardImage src={getCardImage(CARD_BACK)} />}
          onClick={() => dispatch(cardClicked(id))}
          cardState={cardState}
        />
      )}
    </Box>
  )
}

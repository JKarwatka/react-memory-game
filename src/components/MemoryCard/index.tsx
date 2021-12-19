import React from 'react'
import { styled } from '@mui/system';
import { MemoryCardData } from '../../utils/types';
import { FilippableCard } from '../FlippableCard';

interface MemoryCardProps extends MemoryCardData {
  cardBack: string
  onClick: () => void
}


export const CardImage = styled('img')({
  maxWidth: ' 100%',
  maxHeight: '100%',
  height: 'auto'
})

//TODO: Refactor displaying Card based on state
//TODO: Move styled components to separate file
export const MemoryCard = ({ id, cardState, img, onClick, cardBack }: MemoryCardProps) => (
  <FilippableCard
    FrontContent={() => <CardImage src={img} />}
    BackContent={() => <CardImage src={cardBack} />}
    id={id}
    onClick={onClick}
    cardState={cardState}
  />
)




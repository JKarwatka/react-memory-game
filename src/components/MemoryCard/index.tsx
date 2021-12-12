import React from 'react'
import Paper from '@mui/material/Paper';
import { Box, styled } from '@mui/system';
import { MemoryCardData } from '../../utils/interfaces';
import { MemoryCardState } from '../../utils/enums';

interface MemoryCardProps extends MemoryCardData {
  cardBack: string
  onClick: () => void
}


const CardImage = styled('img')({
  maxWidth: ' 100%',
  maxHeight: '100%',
  height: 'auto'
})

//TODO: Refactor displaying Card based on state
//TODO: Move styled components to separate file
export const MemoryCard = ({ id, cardState, img, onClick, cardBack }: MemoryCardProps) => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    padding: 1
  }}>
    {
      cardState !== MemoryCardState.Removed && <Paper sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        height: '100%',
        width: '100%'
      }}
        elevation={6}
        onClick={onClick}
      >
        {cardState === MemoryCardState.FaceUp && <CardImage src={img} />}
        {cardState === MemoryCardState.FaceDown && <CardImage src={cardBack} />}
      </Paper >
    }
  </Box>
)




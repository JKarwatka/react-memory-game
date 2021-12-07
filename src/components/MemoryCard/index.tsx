import React from 'react'
import Paper from '@mui/material/Paper';
import { ReactComponent as Image } from './1.svg';
import { ReactComponent as Back } from './back.svg';
import { styled } from '@mui/material/styles';

interface Props {
  revealed: boolean
  onClick: () => void
}

export const MemoryCard = ({ revealed, onClick }: Props) => {
  return (
    <Paper sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300
    }}
      elevation={6}
      onClick={onClick}
    >
      {
        revealed
          ? <Image />
          : <Back />
      }
    </Paper >
  )
}



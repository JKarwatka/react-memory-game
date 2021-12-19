import React, { ReactNode } from 'react'
import { Paper, Theme } from "@mui/material";
import { motion } from "framer-motion";
import { Box, SxProps } from '@mui/system';
import { MemoryCardState } from '../../utils/enums';
import { getCardState } from '../../store/board/selectors';
import { useAppSelector } from '../../store/store';
import { backVariants, containerStyles, frontVariants, paperStyles } from './styles';

interface FilippableCardProps {
  id: string,
  FrontContent: () => ReactNode,
  BackContent: () => ReactNode,
  onClick: () => void,
  cardState: MemoryCardState
}




export const FilippableCard = ({ id, onClick, FrontContent, BackContent }: FilippableCardProps) => {
  const cardState = useAppSelector(getCardState(id))
  return (
    <Box
      component={motion.div}
      sx={containerStyles}
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.1 }
      }}
      initial={false}
    >
      <Paper
        component={motion.div}
        sx={paperStyles}
        animate={frontVariants[cardState]}
        elevation={6}
        initial={false}
      >
        {FrontContent()}
      </Paper>
      <Paper
        component={motion.div}
        sx={paperStyles}
        elevation={6}
        animate={backVariants[cardState]}
        initial={false}
      >
        {BackContent()}
      </Paper>
    </Box>
  );
};

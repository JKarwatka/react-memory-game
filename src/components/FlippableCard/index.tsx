import React, { ReactNode } from 'react'
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Box } from '@mui/system';
import { FlippableCardState } from '../../utils/enums';
import { backVariants, containerStyles, enlargeCardTransition, frontVariants, paperStyles } from './styles';

interface FilippableCardProps {
  id: string,
  FrontContent: () => ReactNode,
  BackContent: () => ReactNode,
  onClick: () => void,
  cardState: FlippableCardState
}




export const FilippableCard = ({ onClick, FrontContent, BackContent, cardState }: FilippableCardProps) => {
  return (
    <Box
      component={motion.div}
      sx={containerStyles}
      onClick={onClick}
      whileHover={enlargeCardTransition}
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

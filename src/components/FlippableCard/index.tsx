import React, { ReactNode } from 'react'
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Box } from '@mui/system';
import { FlippableCardState } from '../../utils/enums';
import { backVariants, containerStyles, enlargeCardTransition, frontVariants, paperStyles } from './styles';
import { FLIPPABLE_CARD_BACK_TEST_ID, FLIPPABLE_CARD_FRONT_TEST_ID } from './consts';

interface FilippableCardProps {
  FrontContent: () => ReactNode,
  BackContent: () => ReactNode,
  onClick: () => void,
  cardState: FlippableCardState
}




export const FilippableCard = ({ onClick, FrontContent, BackContent, cardState }: FilippableCardProps) => (
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
      data-testid={FLIPPABLE_CARD_FRONT_TEST_ID}
    >
      {FrontContent()}
    </Paper>
    <Paper
      component={motion.div}
      sx={paperStyles}
      elevation={6}
      animate={backVariants[cardState]}
      initial={false}
      data-testid={FLIPPABLE_CARD_BACK_TEST_ID}
    >
      {BackContent()}
    </Paper>
  </Box>
)

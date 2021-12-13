import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { MemoryBoard } from './components/Board';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppDispatch } from './store/store';
import { DEFAULT_NUM_OF_PAIRS } from './utils/consts';
import { initializeGame } from './store/game/slices';


//TODO: Move styling to theme or separate file
const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeGame(DEFAULT_NUM_OF_PAIRS));
  }, [])

  return (
    <>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: '#14110F',
        fontFamily: 'PocketMonk'
      }}>
        <Container maxWidth='lg'>
          <Typography sx={{ fontFamily: 'PocketMonk', textAlign: 'center', color: '#ffcd05', fontSize: '150px' }} variant="h4" component="h4">
            Memory Game
          </Typography>;
          <MemoryBoard />
        </Container>
      </Box>
    </>
  );
}


export default App;

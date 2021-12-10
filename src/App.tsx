import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Board } from './components/Board';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => (
  <>
    <CssBaseline />
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#14110F',
      fontFamily: 'PocketMonk'
    }}>
      <Container maxWidth='lg'>
        <Typography sx={{ fontFamily: 'PocketMonk', color: '#ffcd05', fontSize: '150px' }} variant="h1" component="h1">
          Memory Game
        </Typography>;
        <Board />
      </Container>
    </Box>
  </>
);


export default App;

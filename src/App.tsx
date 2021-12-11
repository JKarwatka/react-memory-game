import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Board } from './components/Board';
import CssBaseline from '@mui/material/CssBaseline';


//TODO: Move styling to theme or separate file
const App = () => (
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
        <Board />
      </Container>
    </Box>
  </>
);


export default App;

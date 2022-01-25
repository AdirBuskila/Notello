import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export const Loader = () => {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500', position: 'absolute', top: '50%' }} spacing={2}>
      {/* <LinearProgress color="secondary" /> */}
      {/* <LinearProgress color="success" /> */}
      <p style={{fontSize: '40px', fontWeight: 'bolder', color: 'grey', margin: 'auto'}}>Loading...</p> 
      <LinearProgress color="inherit" />
    </Stack>
  );
}
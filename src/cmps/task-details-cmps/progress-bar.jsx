import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography sx={{ fontSize: '11px' }} color='text.secondary'>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          sx={{
            borderRadius: '3px',
            backgroundColor: '#e1e4e9',
            height: '8px',
          }}
          variant='determinate'
          {...props}
        />
      </Box>
    </Box>
  );
}

// LinearProgressWithLabel.propTypes = {
//   value: PropTypes.number.isRequired,
// };

export const LinearWithValueLabel = (props) => {
  const color = props.value === 100 ? '#61bd4f' : '#5ba4cf';

  return (
    <Box sx={{ mt: '10px', mb: '10px' }}>
      <LinearProgressWithLabel value={props.value} />
    </Box>
  );
};

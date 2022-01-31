import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import BarWave from "react-cssfx-loading/lib/BarWave";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import Spin from "react-cssfx-loading/lib/Spin";

export const Loader = () => {
  return (
    // <BarWave style={{margin: 'auto'}} color="#0179bf" width="60px" height="60px" duration="3s" />
    // <Hypnosis style={{margin: 'auto'}} color="#0179bf" width="100px" height="100px" duration="3s" />
    <Spin style={{margin: 'auto'}} color="#0179bf" width="120px" height="120px" duration="3s" />
    
  );
}
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';

import { utilService } from '../services/util.service';

export const LabelsCmp = ({ labels }) => {
  return (
    <section className='labels-main-container flex column'>
      <div className='labels-info-container'>
        <div className='span-container'>
          <span>Labels</span>
        </div>
      </div>
      <div className="labels-container flex">


      {labels.map((label, idx) => {
        return (
          <div
            key={idx}
            style={{ backgroundColor: `${label.bgc}` }}
            className='label-container flex justify-center align-center'
          >
            <p>{label.name}</p>
          </div>
        );
      })}
      <div
        key={utilService.makeId()}
        className='add-square-icon flex align-center justify-center'
      >
        <AddIcon key={utilService.makeId()} />
      </div>
      </div>
    </section>
  );
};

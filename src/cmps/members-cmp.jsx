import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { utilService } from '../services/util.service';


export const MembersCmp = ({members}) => {
    return (
        <section className='flex' >
        {members.map((member, idx) => {
          return (
            <Avatar
              key={idx}
              sx={{
                bgcolor: deepPurple[500],
                width: 30,
                height: 30,
                marginInlineEnd: 1,
              }}
            >
              <p>{member.fullname.slice(0, 1)}</p>
            </Avatar>
          );
        })}{' '}
        <div className='add-icon flex align-center justify-center'>
          <AddIcon key={utilService.makeId()} />
        </div>
      </section>
    )
}
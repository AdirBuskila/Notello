import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { MembersModal } from './members-modal';

import { utilService } from '../../services/util.service';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


export const MembersCmp = (props) => {

  const {task, members, group, board} = props

  return (
    <section className='members-main-container'>
      <div className='members-info-container'>
        <div className='span-container'>
          <span>Members</span>
        </div>
      </div>
      <div className='members-avatar-container flex'>
      {members.map((member, idx) => {
        return (
          <Avatar
            key={idx}
            src={member.imgUrl}
            alt={member.fullname}
            sx={{
              bgcolor: stringToColor(member.fullname),
              width: 34,
              height: 34,
              marginInlineEnd: 1,
            }}
          >
          </Avatar>
        );
      })}{' '}
      <div className='add-icon flex align-center justify-center'>
        <AddIcon key={utilService.makeId()} />
        <MembersModal task={task} board={board} group={group} / >
      </div>
      </div>
    </section>
  );
};

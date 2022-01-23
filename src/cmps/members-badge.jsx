import Avatar from '@mui/material/Avatar';

export const MembersBadge = ({ members }) => {
    console.log(members);
  return (
    <div className='members-badge-container flex align-center'>
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
      ></Avatar>
    );
  })}
    </div>
  );
};

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


// {members.map((member, idx) => {
//     return (
//       <Avatar
//         key={idx}
//         src={member.imgUrl}
//         alt={member.fullname}
//         sx={{
//           bgcolor: stringToColor(member.fullname),
//           width: 34,
//           height: 34,
//           marginInlineEnd: 1,
//         }}
//       ></Avatar>
//     );
//   })}


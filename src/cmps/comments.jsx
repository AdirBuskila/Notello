import Avatar from '@mui/material/Avatar';
import { utilService } from '../services/util.service';

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

export const Comments = ({comments}) => {
    console.log(comments);
  comments.map((comment) => {
    return (
      <div className='comment'>
        <div className='comment-creator'>
          <Avatar
            src={comment.byMember.imgUrl}
            alt={comment.byMember.fullname}
            sx={{
              bgcolor: stringToColor(comment.byMember.fullname),
              width: 34,
              height: 34,
              marginInlineEnd: 1,
            }}
          ></Avatar>
        </div>
        <div className='memeber-info'>
          <p className='member-name'>{comment.byMember.fullname}</p>
          <p className='member-name'>{utilService.fixTimestamp(comment.createdAt)}</p>
        </div>
      </div>
    );
  });
}

// [
//   {
//     id: utilService.makeId(),
//     txt: 'We are changing the json',
//     createdAt: Date.now(),
//     byMember: {
//       _id: 'm102',
//       fullname: 'Netanel G',
//       imgUrl:
//         'https://res.cloudinary.com/dubjerksn/image/upload/v1642889899/Notello/istockphoto-514558793-612x612_grfxxn.jpg',
//     },
//   },
// ];

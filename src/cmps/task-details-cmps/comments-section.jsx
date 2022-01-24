import Avatar from '@mui/material/Avatar';
import { utilService } from '../../services/util.service';


export const CommentsSection = ({ comments }) => {
  if (!comments.length) return <p></p>;
  return (
    <div className='comments-container'>
      {comments.map((comment) => {
        return (
          <div key={utilService.makeId()} className='comment flex'>
            <div className='comment-creator'>
              <Avatar
                src={comment.byMember.imgUrl}
                alt={comment.byMember.fullname}
                sx={{
                  bgcolor: 'green',
                  width: 32,
                  height: 32,
                  marginInlineEnd: 1,
                }}></Avatar>
            </div>
            <div className='memeber-info flex column'>
              <p className='member-name'>{comment.byMember.fullname}</p>
              <p className='member-name'>
                {utilService.fixTimestamp(comment.createdAt)}
              </p>
              <p>{comment.txt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
//
// }

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

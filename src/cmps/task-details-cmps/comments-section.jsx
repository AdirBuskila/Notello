import Avatar from '@mui/material/Avatar';
import { utilService } from '../../services/util.service';
import { useDispatch } from 'react-redux';
import { boardService } from '../../services/board.service';
import { ActivityPerTask } from './activity-per-task';

export const CommentsSection = (props) => {
  const { comments, task, group, board, setActivityOpen, activityOpen } = props;
  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const dispatch = useDispatch();

  const onDeleteComment = (commentId) => {
    const commentIdx = task.comments.findIndex((comment) => {
      return commentId === comment._id;
    });
    task.comments.splice(commentIdx, 1);
    board.groups[groupIdx].tasks[taskIdx] = task;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  };

  return (
    <div className='comments-container flex column'>
      {comments.map((comment) => {
        return (
          <div key={utilService.makeId()} className='comment flex'>
            <div className='comment-creator'>
              <Avatar
                src={comment.byMember.imgUrl}
                alt={comment.byMember.fullname}
                sx={{
                  bgcolor: utilService.stringToColor(comment.byMember.fullname),
                  width: 32,
                  height: 32,
                  marginInlineEnd: 1,
                }}></Avatar>
            </div>
            <div className='member-info flex column'>
              <div className='comment-data flex'>
                <p className='member-name'>{comment.byMember.fullname}</p>
                <p className='comment-time'>
                  {utilService.fixTimestamp(comment.createdAt)}
                </p>
              </div>
              <p>{comment.txt}</p>
              <p
                className='delete-comment pointer'
                onClick={() => {
                  onDeleteComment(comment._id);
                }}>
                Delete
              </p>
            </div>
          </div>
        );
      })}
      { activityOpen && <ActivityPerTask task={task} board={board} />}
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

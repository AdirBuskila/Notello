import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

export const CommentsBadge = ({ comments }) => {
  return (
    <div className='comments-badge flex align-center'>
      <ChatBubbleOutlineRoundedIcon fontSize='small' color='action' />
      <p>{comments.length}</p>
    </div>
  );
};

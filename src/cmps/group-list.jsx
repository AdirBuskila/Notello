import { GroupPreview } from './group-preview';
import { Card } from './UI/Card';

export const GroupList = ({ groups, onLoadBoard }) => {
  if (!groups) return <q>No groups</q>;
  return (
    <Card className='group-list-container flex'>
      {groups.map((group) => (
        <GroupPreview onLoadBoard={onLoadBoard} group={group} key={group._id} />
      ))}
    </Card>
  );
};

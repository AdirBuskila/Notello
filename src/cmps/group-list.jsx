import { GroupPreview } from './group-preview';
import { Card } from './UI/Card';

export const GroupList = ({ groups, onLoadBoard }) => {
  if (!groups) return <q>No groups</q>;
  return (
    <Card className='groups-container flex'>
      {groups.map((group, idx) => (
        <GroupPreview onLoadBoard={onLoadBoard} key={group._id} group={group} groupIdx={idx} />
      ))}
    </Card>
  );
};

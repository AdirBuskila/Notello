import { GroupPreview } from './group-preview';
import { Card } from './UI/Card';

export const GroupList = ({ groups }) => {
  if (!groups.length) return <q>No groups</q>;
  return (
    <Card className='groups-container flex column'>
      {groups.map((group) => (
        <GroupPreview key={group._id} group={group} />
      ))}
    </Card>
  );
};

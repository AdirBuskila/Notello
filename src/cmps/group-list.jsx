import { GroupPreview } from './group-preview';
import { Card } from './UI/Card';

export const GroupList = ({ groups }) => {
  if (!groups) return <q>No groups</q>;
  return (
    <Card className='groups-container flex'>
      {groups.map((group) => (
        <GroupPreview key={group._id} group={group} />
      ))}
    </Card>
  );
};

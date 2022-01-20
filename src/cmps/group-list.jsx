import { GroupPreview } from './group-preview';
import { DragDropContext } from 'react-beautiful-dnd';
import { Card } from './UI/Card';

export const GroupList = ({ groups, onLoadBoard }) => {
  if (!groups) return <q>No groups</q>;

  const onDragEnd = (result) => {
    // TODO = update the state
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className='group-list-container flex'>
        {groups.map((group) => (
          <GroupPreview
            onLoadBoard={onLoadBoard}
            group={group}
            key={group._id}
          />
        ))}
      </Card>
    </DragDropContext>
  );
};

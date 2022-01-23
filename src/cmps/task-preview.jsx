import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { ScrollDialog } from '../pages/task-details';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import NotesIcon from '@mui/icons-material/Notes';
import { ChecklistBadge } from './checklist-badge';


import { Link } from 'react-router-dom';


export const TaskPreview = (props) => {
  const task = props.task;
  const dispatch = useDispatch();
  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
  );
  const [openPopup, setOpenPopup] = useState(false);

  const onHandleLablesClick = (ev) => {
    ev.stopPropagation();
    dispatch({ type: 'HANDLE_LABELS' });
  };
  const className = isLabelsExpended
    ? 'flex align-center expended'
    : 'flex align-center';



  return (
    <React.Fragment>
      {/* <Link key={task._id} to={`/c/${task._id}`}> */}
      <Draggable
        draggableId={task._id}
        index={props.index}
        key={task._id}
        type='task'
      >
        {(provided) => (
          <div
            onClick={() => {
              setOpenPopup(true);
            }}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className='task-preview flex column'
            key={task._id}
          >
            {task.labels && (
              <ul className='labels flex'>
                {task.labels.map((label, idx) => {
                  return (
                    <li
                      className={className}
                      onClick={(ev) => onHandleLablesClick(ev)}
                      key={idx}
                      style={{ backgroundColor: `${label.bgc}` }}
                    >
                      {isLabelsExpended && `${label.name}`}
                    </li>
                  );
                })}
              </ul>
            )}
            <p>{task.title}</p>
            <div className="task-badges flex">
              {task.comments.length > 0 && <ChatBubbleOutlineRoundedIcon fontSize='extra-small' color='action' />}
              {task.attachments.length > 0 && <AttachFileIcon fontSize='extra-small' color='action' />}
              {task.description !== '' && <NotesIcon fontSize='extra-small' color='action' />}
              {task.checklists.length > 0 && <ChecklistBadge checklists={task.checklists} />}
            </div>
          </div>
        )}
      </Draggable>
      <ScrollDialog
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        onLoadBoard={props.onLoadBoard}
        groupIdx={props.groupIdx}
        task={task}
        members={task.members}
        title={task.title}
        labels={task.labels}
        attachments={task.attachments}
      ></ScrollDialog>
    </React.Fragment>
  );
};

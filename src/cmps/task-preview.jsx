import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { ChecklistBadge } from './badge-cmps/checklist-badge';
import SubjectIcon from '@mui/icons-material/Subject';

import { Link, Route } from 'react-router-dom';
import { CommentsBadge } from './badge-cmps/comments-badge';
import { MembersBadge } from './badge-cmps/members-badge';
import { AttachmentsBadge } from './badge-cmps/attachments-badge';
import { DueDateBadge } from './badge-cmps/due-date-badge';

export const TaskPreview = (props) => {
  const { task, board, groupIdx } = props;
  const dispatch = useDispatch();
  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
  );
  const [openPopup, setOpenPopup] = useState(false);
  const [isDueDateChanged, setIsDueDateChanged] = useState(false)

  const onHandleLablesClick = (ev) => {
    ev.stopPropagation();
    dispatch({ type: 'HANDLE_LABELS' });
  };
  const className = isLabelsExpended
    ? 'flex align-center expended'
    : 'flex align-center';


  return (
    <React.Fragment>
      <Link to={`/b/${board._id}/${task._id}`}>
        <Draggable
          draggableId={task._id}
          index={props.index}
          key={task._id}
          type='task'>
          {(provided) => (
            <div
              className='task-preview flex column'
              onClick={() => {
                setOpenPopup(true);
              }}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              key={task._id}>
              {task.labels && (
                <ul className='labels flex'>
                  {task.labels.map((label, idx) => {
                    return (
                      <li
                        className={className}
                        onClick={(ev) => onHandleLablesClick(ev)}
                        key={idx}
                        style={{ backgroundColor: `${label.bgc}` }}>
                        {isLabelsExpended && `${label.name}`}
                      </li>
                    );
                  })}
                </ul>
              )}
              <p>{task.title}</p>
              <div className='task-info-icons flex space-between'>
                <div className='task-badges flex align-center'>

                  {task.dueDate.length > 0 && (<DueDateBadge groupIdx={groupIdx} task={task} board={board} isDueDateChanged={isDueDateChanged} setIsDueDateChanged={setIsDueDateChanged} dueDate={task.dueDate} />)}

                  {task.comments.length > 0 && (<CommentsBadge comments={task.comments} />)}
                  {task.attachments.length > 0 && (
                    <AttachmentsBadge attachments={task.attachments} />
                  )}
                  {task.description && (
                    <SubjectIcon fontSize='extra-small' color='action' />
                  )}
                  {task.checklists.length > 0 && (
                    <ChecklistBadge checklists={task.checklists} />
                  )}
                </div>
                <div className='members-badge flex align-center'>
                  {task.members.length > 0 && (
                    <MembersBadge members={task.members} />
                  )}
                </div>
              </div>
            </div>
          )}
        </Draggable>
        {/* <ScrollDialog
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        onLoadBoard={props.onLoadBoard}
        groupIdx={props.groupIdx}
        task={task}
        members={task.members}
        title={task.title}
        labels={task.labels}
        attachments={task.attachments}></ScrollDialog> */}
      </Link>
    </React.Fragment>
  );
};

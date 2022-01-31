import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Link, useHistory } from 'react-router-dom';

import { ChecklistBadge } from './badge-cmps/checklist-badge';
import SubjectIcon from '@mui/icons-material/Subject';
import { CommentsBadge } from './badge-cmps/comments-badge';
import { MembersBadge } from './badge-cmps/members-badge';
import { AttachmentsBadge } from './badge-cmps/attachments-badge';
import { DueDateBadge } from './badge-cmps/due-date-badge';

import { utilService } from '../services/util.service';

export const TaskPreviewMiniMenu = (props) => {
  /* states */
  const { task, board, groupIdx, taskPosition, setTaskNewTitle} = props;
  const [isDueDateChanged, setIsDueDateChanged] = useState(false);

  /* values */
  const taskCover = task.cover ? (task.cover.background ? task.cover : '') : '';
  const isFull = taskCover.spread === 'full' ? true : false;
  const coverType = taskCover
    ? utilService.isStringColor(taskCover.background)
      ? 'backgroudColor'
      : 'backgroundImage'
    : null;

  const dispatch = useDispatch();

  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
  );

  const className = isLabelsExpended
    ? 'flex align-center expended'
    : 'flex align-center';

  const onModalClick = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  const onHandleLablesClick = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    dispatch({ type: 'HANDLE_LABELS' });
  };

  const onHandleTitleChange = (ev) => {
    setTaskNewTitle(ev.target)
  };

  return (
    <React.Fragment>
      <section
        onClick={(ev) => onModalClick(ev)}
        className='task-preview flex column' style={taskPosition}>
        {/* Upper cover */}
        {taskCover &&
          !isFull &&
          (coverType === 'backgroudColor' ? (
            <div
              className='task-cover'
              style={{
                backgroundColor: `${taskCover.background}`,
                height: '2rem',
              }}></div>
          ) : (
            <div>
              <img src={taskCover.background} alt='task-img' />
            </div>
          ))}

        <div
          style={isFull ? { backgroundColor: `${taskCover.background}` } : null}
          className='task-not-cover flex column'>
          {task.labels && !isFull && (
            <ul className='labels flex'>
              {task.labels.map((label, idx) => {
                return (
                  <li
                    className={className}
                    onClick={(ev) => onHandleLablesClick(ev)}
                    key={idx}
                    style={{ backgroundColor: `${label.bgc}` }}>
                    {isLabelsExpended && label.name && `${label.name}`}
                  </li>
                );
              })}
            </ul>
          )}

          {/* Inner title with option to change */}
          <textarea
            autoFocus
            onFocus={(ev) => {
              ev.currentTarget.select();
            }}
            defaultValue={task.title}
            onChange={(ev) => onHandleTitleChange(ev)}></textarea>

          {!isFull && (
            <div className='task-info-icons flex space-between'>
              <div className='task-badges flex align-center'>
                {task.dueDate.length > 0 && (
                  <DueDateBadge
                    groupIdx={groupIdx}
                    task={task}
                    board={board}
                    isDueDateChanged={isDueDateChanged}
                    setIsDueDateChanged={setIsDueDateChanged}
                    dueDate={task.dueDate}
                  />
                )}

                {task.comments.length > 0 && (
                  <CommentsBadge comments={task.comments} />
                )}
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
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

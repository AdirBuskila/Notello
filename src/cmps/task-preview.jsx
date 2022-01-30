import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Link, useHistory } from 'react-router-dom';

import { ChecklistBadge } from './badge-cmps/checklist-badge';
import SubjectIcon from '@mui/icons-material/Subject';
import { CommentsBadge } from './badge-cmps/comments-badge';
import { MembersBadge } from './badge-cmps/members-badge';
import { AttachmentsBadge } from './badge-cmps/attachments-badge';
import { DueDateBadge } from './badge-cmps/due-date-badge';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';

import { TaskPreviewHover } from './task-preview-hover';

import { utilService } from '../services/util.service';

export const TaskPreview = (props) => {
  const { task, board, groupIdx, source, setPreview } = props;
  const [isHover, setIsHover] = useState(false);
  const taskCover = task.cover ? (task.cover.background ? task.cover : '') : '';
  const isFull = taskCover.spread === 'full' ? true : false;
  const [isDueDateChanged, setIsDueDateChanged] = useState(false);
  const coverType = taskCover
    ? utilService.isStringColor(taskCover.background)
      ? 'backgroudColor'
      : 'backgroundImage'
    : null;

  const dispatch = useDispatch();
  const history = useHistory();
  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
  );

  const onHandleLablesClick = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    dispatch({ type: 'HANDLE_LABELS' });
  };

  const onHandleEnter = () => {
    setIsHover(true);
  };

  const onHandleLeave = () => {
    setIsHover(false);
  };

  const className = isLabelsExpended
    ? 'flex align-center expended'
    : 'flex align-center';

  return (
    <React.Fragment>
      <Link to={`/b/${board._id}/${task._id}`}>
        <Draggable
          Draggable='true'
          draggableId={task._id}
          index={props.index}
          key={task._id}
          type='task'>
          {(provided) => (
            <div
              id={task._id}
              onMouseEnter={onHandleEnter}
              onMouseLeave={onHandleLeave}
              className='task-preview flex column'
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              key={task._id}>

              
              {isHover && (
                <TaskPreviewHover
                setPreview={setPreview}
                  taskId={task._id}
                  task={task}
                  board={board}
                  groupIdx={groupIdx}
                  index={props.index}
                  key={task._id}
                />
              )}

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
                style={
                  isFull ? { backgroundColor: `${taskCover.background}` } : null
                }
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
                <p>{task.title}</p>

                {!isFull && (
                  <div className='task-info-icons flex space-between wrap'>
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
            </div>
          )}
        </Draggable>
      </Link>
    </React.Fragment>
  );
};

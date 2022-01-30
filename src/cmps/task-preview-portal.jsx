import React, { useState, useEffect } from 'react';

import { LabelsModal } from './details-labels';
import { MembersModal } from './task-details-cmps/members-modal';
import { DatePickerModal } from './task-details-cmps/date-picker-modal';
import { CheckListModal } from './check-list-modal';
import { AttachmentModal } from './task-details-cmps/attachment-modal';
import { CoverModal } from './cover-modal';
import { CopyMoveModal } from './copy-move-details';
import { ArchiveModal } from './details-archive';

import { useHistory } from 'react-router-dom';

export const TaskPreviewPortal = (props) => {
  const { portalPosition, board, task, groupIdx} = props;
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const history = useHistory();

  const onHandleOpenCard = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    props.setPos(null);
    history.push(`/b/${board._id}/${task._id}`);
  };

  return (
    <React.Fragment>
      <section className='mini-menu-portal' style={portalPosition}>
        <button onClick={(ev) => onHandleOpenCard(ev)}>Open card</button>
        <button>
          <LabelsModal
            task={task}
            groupIdx={groupIdx}
            board={board}
            taskIdx={taskIdx}
          />
        </button>
        <button>
           <MembersModal task={task} board={board} group={board.groups[groupIdx]} />
           </button>
        <button>
          <CheckListModal
            board={board}
            groupIdx={groupIdx}
            taskIdx={taskIdx}
            task={task}
          />
        </button>
        <button>
          <DatePickerModal
            task={task}
            board={board}
            group={board.groups[groupIdx]}
          />
        </button>
        <button>
          <AttachmentModal
            task={task}
            board={board}
            group={board.groups[groupIdx]}
            attachments={task.attachments}
          />
        </button>
        <button>
          <CoverModal
            updateTask={task}
            board={board}
            groupIdx={groupIdx}
            taskIdx={taskIdx}
            task={task}
          />
        </button>
        <button>
          <CopyMoveModal
            type={'copy'}
            board={board}
            groupIdx={groupIdx}
            taskIdx={taskIdx}
            task={task}
          />
        </button>
        <button>
          <ArchiveModal
            board={board}
            groupIdx={groupIdx}
            taskIdx={taskIdx}
            task={task}
          />
        </button>
      </section>
    </React.Fragment>
  );
};

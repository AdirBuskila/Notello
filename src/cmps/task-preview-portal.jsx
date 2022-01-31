import React, { useState, useEffect } from 'react';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useSelector } from 'react-redux';

import { LabelsModal } from './labels-modal';
import { MembersModal } from './task-details-cmps/members-modal';
import { DatePickerModal } from './task-details-cmps/date-picker-modal';
import { AttachmentModal } from './task-details-cmps/attachment-modal';
import { CoverModal } from './cover-modal';
import { CopyMoveModal } from './copy-move-details';
import { ArchiveModal } from './details-archive';

import { useHistory } from 'react-router-dom';

export const TaskPreviewPortal = (props) => { 
  const board = useSelector((state) => state.boardModule.board);
  const { portalPosition, groupIdx} = props;
  const [task, setTask] = useState(props.task)
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
        <button onClick={(ev) => onHandleOpenCard(ev)}>
          Open card
          </button>
        <button>
          <LabelsModal
          from={'mini-menu'}
          setTask={setTask}
            task={task}
            groupIdx={groupIdx}
            board={board}
            taskIdx={taskIdx}
          />
        </button>
        <button>
           <MembersModal 
           from={'mini-menu'}
           task={task} 
           board={board} 
           group={board.groups[groupIdx]} />
           </button>
        <button>
          <DatePickerModal
          from={'mini-menu'}
            task={task}
            board={board}
            group={board.groups[groupIdx]}
          />
        </button>
        <button>
          <AttachmentModal
          from={'mini-menu'}
            task={task}
            board={board}
            group={board.groups[groupIdx]}
            attachments={task.attachments}
          />
        </button>
        <button>
          <CoverModal
          from={'mini-menu'}
            updateTask={task}
            board={board}
            groupIdx={groupIdx}
            taskIdx={taskIdx}
            task={task}
          />
        </button>
        <button>
          <CopyMoveModal
          from={'mini-menu'}
            type={'copy'}
            board={board}
            groupIdx={groupIdx}
            taskIdx={taskIdx}
            task={task}
          />
        </button>
        <button>
          <ArchiveModal
          from={'mini-menu'}
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

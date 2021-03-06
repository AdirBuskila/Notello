import React, { useState } from 'react';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { useSelector } from 'react-redux';

import { LabelsModal } from '../task-details-cmps/labels-modal';
import { MembersModal } from '../task-details-cmps/members-modal';
import { DatePickerModal } from '../task-details-cmps/date-picker-modal';
import { CoverModal } from '../task-details-cmps/cover-modal';
import { CopyMoveModal } from '../task-details-cmps/copy-move-details';
import { ArchiveModal } from '../task-details-cmps/details-archive';

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
        <button className='flex align-center' onClick={(ev) => onHandleOpenCard(ev)}>
          <VideoLabelIcon sx={{fontSize: 'small', marginInlineEnd: '5px'}} />
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
          <DatePickerModal
          from={'mini-menu'}
            task={task}
            board={board}
            group={board.groups[groupIdx]}
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

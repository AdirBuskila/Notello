import React, { useState, useEffect } from 'react';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { LinearWithValueLabel } from '../cmps/progress-bar'
import {CheckListSection} from '../cmps/check-list-section'

import { boardService } from '../services/board.service';

export const CheckList = (props) => {
    const { board, task, taskIdx, groupIdx } = props;
    const [checkList, setCheckList] = useState(props.checklist)
    const [isEdditing, setIsEdditing] = useState(false);
    const [isCanging, setIsChanging] = useState(false);


    const handleCheckBoxClick = (checkListId, todoId) => {
        const checklistIdx = task.checklists.findIndex((chk) => {
            return (chk._id === checkListId)
        })
        const todoIdx = task.checklists[checklistIdx].todos.findIndex((td) => {
            return (td._id === todoId);
        })
        let { isDone } = task.checklists[checklistIdx].todos[todoIdx];
        task.checklists[checklistIdx].todos[todoIdx].isDone = !isDone;
        board.groups[groupIdx].tasks[taskIdx] = task;
        boardService.saveBoard(board);
        setIsChanging(false);
        setIsEdditing(!isEdditing)
    }

    const getProgressValue = (checkList) => {
        return checkList.todos.reduce((acc, t) => {
            (t.isDone) ? acc += (100 / checkList.todos.length) : acc += 0;
            return acc
        }, 0)
    }

    if (!checkList) return (<></>)
    return (
        <div>
            <div className="checklist-header flex align-center">
                <AssignmentTurnedInOutlinedIcon className='header-icon' />
                <section className='checklist-header-title flex align-center space-between'>
                    <p>{checkList.title}</p>
                    <div className='flex end'>
                        <button>Delete</button>
                    </div>
                </section>
            </div>
            <LinearWithValueLabel value={getProgressValue(checkList)} />
            {
                checkList.todos.map((td) => {
                    return (<div className='checkbox-info flex'>
                        <div onClick={() => {
                            handleCheckBoxClick(checkList._id, td._id)
                        }}>
                            {!td.isDone ? <CheckBoxOutlineBlankOutlinedIcon className='checkbox' /> : <CheckBoxOutlinedIcon className='checkbox' />}
                        </div>
                        {!isCanging ? <div onClick={() => setIsChanging(true)}>
                            {(td.isDone) ? <p className='line-through'>{td.title}</p> : <p>{td.title}</p>}
                        </div>
                        : <CheckListSection />}
                    </div>)
                })
            }
            <button className='last-btn'>Add an item</button>
        </div>

    )
}
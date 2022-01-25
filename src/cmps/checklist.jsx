import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { LinearWithValueLabel } from '../cmps/progress-bar'
import {CheckListSection} from '../cmps/check-list-section'
import { CheckListDelete } from './check-list-delete';

import { boardService } from '../services/board.service';

export const CheckList = (props) => {
    const board = useSelector(
        (state) => state.boardModule.board
      );
    const {task, taskIdx, groupIdx, checklistIdx } = props;
    const [checkList, setCheckList] = useState(props.checklist)
    const [isEdditing, setIsEdditing] = useState(false);
    const [currTodoId, setCurrTodoId] = useState('');
    const [isChanging, setIsChanging] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        console.log('IM THE EFFECT');
        setCheckList(props.checklist)
    }, [board])


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
                        <CheckListDelete setIsEdditing={setIsEdditing} checklistIdx={checklistIdx} board={board} task={task} taskIdx={taskIdx} groupIdx={groupIdx} checkList={checkList} />                    
                        </div>
                </section>
            </div>
            <LinearWithValueLabel value={getProgressValue(checkList)} />
            <div className='checkbox-info flex column'>
            {checkList.todos.map((td, index) => {
                return (<div className='individual-checklist flex'>
                        <div className='flex' onClick={() => {
                            handleCheckBoxClick(checkList._id, td._id)
                        }}>
                            {!td.isDone ? <CheckBoxOutlineBlankOutlinedIcon className='checkbox' /> : <CheckBoxOutlinedIcon className='checkbox' />}
                        </div>
                        {isChanging && currTodoId === td._id ? <CheckListSection type={'oldTodo'} todo={td} checklistIdx={checklistIdx} setIsChanging={setIsChanging} board={board} task={task} taskIdx={taskIdx} groupIdx={groupIdx} todoIdx={index} />
                        :
                        <div className='todo-title' onClick={() => {
                            setCurrTodoId(td._id)
                            setIsChanging(true)
                        }}>
                            {(td.isDone) ? <p style={{color: '#5e6c84'}} className='line-through'>{td.title}</p> : <p>{td.title}</p>}
                        </div>}
                    </div>)
                })
            }
            </div>
            {!isAdding ? <button onClick={() => setIsAdding(true)} className='last-btn'>Add an item</button> : <CheckListSection type={'newTodo'} checklistIdx={checklistIdx} setIsAdding={setIsAdding} board={board} task={task} taskIdx={taskIdx} groupIdx={groupIdx} />}
        </div>

    )
}
import React, { useState, useEffect } from "react";
import {useSelector, useDispatch } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CheckListActionModal } from "./check-list-actions-modal";
import { saveBoard } from "../../store/actions/board.action";

import { utilService } from "../../services/util.service";
import { boardService } from "../../services/board.service";

export const CheckListTodos = (props) => {
    const { todo, todoIdx, board, task, taskIdx, isChanging, groupIdx, checklistIdx } = props;
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
    const dispatch = useDispatch()
    const [todoTitle, setTodoTitle] = useState('');
    const [isActionsOpen, setIsActionsOpen] = useState(false);

    useEffect(() => {
        (props.type !== 'newTodo') ? setTodoTitle(todo.title) : setTodoTitle('');
    }, [])

    const onHandleModal = (ev) => {
        ev.preventDefault()
        if (isChanging) {
            props.setIsChanging(false);
        } else {
            props.setIsAdding(false);
        }
    }

    const onHandleChange = ({ target }) => {
        const value = target.value;
        setTodoTitle(value);
    };

    const onSave = () => {
        if (!todoTitle) return; // add a nice modal
        const activity = boardService.addTaskActivity(`updated todo ${todoTitle} title, at checklist - ${task.checklists[checklistIdx].title}`, task._id, task.title, loggedInUser)
        try {
            if (activity) board.activities.unshift(activity);
            task.checklists[checklistIdx].todos[todoIdx].title = todoTitle;
            board.groups[groupIdx].tasks[taskIdx] = task;
            dispatch(saveBoard(board))
        } catch (err) {
            console.log(`Cant update ${todo._id} state`, err);
        }
    }

    const onAdd = () => {
        const newTodo = { title: todoTitle, _id: utilService.makeId(), isDone: false };
        if (!newTodo.title) return; // add a nice modal
        const activity = boardService.addTaskActivity(`added todo ${newTodo.title}, to checklist - ${task.checklists[checklistIdx].title}`, task._id, task.title, loggedInUser)
        try {
            if (activity) board.activities.unshift(activity);
            task.checklists[checklistIdx].todos.push(newTodo)
            board.groups[groupIdx].tasks[taskIdx] = task;
            dispatch(saveBoard(board))
        } catch (err) {
            console.log(`Cant add todo to checklist`, err);
        }
    }

    return (
        <section>
            <div className='new-item flex column'>
                <textarea
                    required
                    autoFocus
                    onChange={onHandleChange}
                    rows={3}
                    cols={5}
                    value={todoTitle}
                ></textarea>
                <div className='new-item-actions flex align-center'>
                    <div>
                        {props.type === 'newTodo' ? <button onClick={onAdd}>Add</button>
                            : <button onClick={onSave}>Save</button>}
                    </div>
                    <a href='#' onClick={(ev) => onHandleModal(ev)}>
                        ???
                    </a>
                    <MoreHorizIcon onClick={() => setIsActionsOpen(true)} style={{ fill: '#6b778c' }} />
                    {isActionsOpen && <CheckListActionModal />}
                </div>
            </div>
        </section>
    )
}
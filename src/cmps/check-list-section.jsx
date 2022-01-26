import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { CheckListActionModal } from "./check-list-actions-modal";

import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service"

export const CheckListSection = (props) => {
    console.log("props: ", props.setIsChanging);
    const { todo, todoIdx, board, task, taskIdx, groupIdx, isChanging, checklistIdx, isAdding } = props;
    const dispatch = useDispatch()
    const [todoTitle, setTodoTitle] = useState('');
    const [isActionsOpen, setIsActionsOpen] = useState(false);

    useEffect(() => {
        (props.type !== 'newTodo') ? setTodoTitle(todo.title) : setTodoTitle('');
    }, [])

    const onHandleModal = () => {
        // props.setIsChanging(false);
        props.setIsAdding(false);
    }

    const onHandleChange = ({ target }) => {
        const value = target.value;
        setTodoTitle(value);
    };

    const onSave = () => {
        if (!todoTitle) return; // add a nice modal
        task.checklists[checklistIdx].todos[todoIdx].title = todoTitle;
        board.groups[groupIdx].tasks[taskIdx] = task;
        const action = { type: 'SET_BOARD', board };
        dispatch(action);
        props.setIsChanging(false);
        props.setIsAdding(false);
    }

    const onAdd = () => {
        const newTodo = { title: todoTitle, _id: utilService.makeId(), isDone: false };
        if (!newTodo.title) return; // add a nice modal
        task.checklists[checklistIdx].todos.push(newTodo)
        board.groups[groupIdx].tasks[taskIdx] = task;
        const action = { type: 'SET_BOARD', board };
        dispatch(action);
        props.setIsAdding(!isAdding);
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
                    <a href='#' onClick={onHandleModal}>
                        ✕
                    </a>
                    <MoreHorizIcon onClick={() => setIsActionsOpen(true)} style={{ fill: '#6b778c' }} />
                    {isActionsOpen && <CheckListActionModal />}
                </div>
            </div>
        </section>
    )
}
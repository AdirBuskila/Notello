import React, {useState, useEffect} from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { CheckListActionModal } from "./check-list-actions-modal";

import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service"

export const CheckListSection = (props) => {
    const {board, taskIdx, groupIdx, task, checklistIdx} = props;
    const [todoTitle, setTodoTitle] = useState('');
    const [actionsOpen, setActionsOpen] = useState(false);

    useEffect(() => {
        (props.type !== 'newTodo') ? setTodoTitle(props.todo.title) : setTodoTitle('');
    }, [])
    
    const onHandleModal = () => {
        (props.type !== 'newTodo') ? props.setIsChanging(false) : props.setIsAdding(false);
    }

    const onHandleChange = ({ target }) => {
        const value = target.value;
        setTodoTitle(value);
      };

      const onSave = () => {
          task.checklists[checklistIdx].todos[props.todoIdx].title = todoTitle;
          board.groups[groupIdx].tasks[taskIdx] = task;
          boardService.saveBoard(board);
          props.setIsChanging(false);
      }

      const onAdd = () => {
        let newTodo = {title: todoTitle, _id: utilService.makeId(), isDone: false};
        task.checklists[checklistIdx].todos.push(newTodo)
        board.groups[groupIdx].tasks[taskIdx] = {...board.groups[groupIdx].tasks[taskIdx], task};
        boardService.saveBoard(board);
        props.setIsAdding(false);
      }


    return (
        <section>
            <div className='new-item flex column'>
                <textArea
                    required
                    autoFocus
                    onChange={onHandleChange}
                    value={todoTitle}
                />
                <div className='new-item-actions flex align-center'>
                    <div>
                    {props.type === 'newTodo' ? <button onClick={onAdd}>Add</button> 
                            : <button onClick={onSave}>Save</button>}
                    </div>
                    <a href='#' onClick={onHandleModal}>
                        ✕
                    </a>
                    <MoreHorizIcon onClick={() => setActionsOpen(true)} style={{ fill: '#6b778c' }} />
                    {actionsOpen && <CheckListActionModal />}
                </div>
            </div>
        </section>
    )
}
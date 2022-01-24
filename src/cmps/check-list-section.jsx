import React, {useState, useEffect} from "react";

import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service"

export const CheckListSection = (props) => {
    const {board, taskIdx, groupIdx, task, checklistIdx} = props;

    const [todoTitle, setTodoTitle] = useState('');

    useEffect(() => {
        (props.type !== 'newTodo') ? setTodoTitle(props.todo.title) : setTodoTitle('');
    }, [])
    
    const onHandleModal = () => {
        console.log('props.type', props.type, 'props.todo', props.todo);
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
                <input
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
                </div>
            </div>
        </section>
    )
}
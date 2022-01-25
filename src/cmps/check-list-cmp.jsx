import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {CheckList} from '../cmps/checklist'

export const CheckListCmp = (props) => {
    console.log("props: ", props);
    const board = useSelector(
        (state) => state.boardModule.board
    );
    const [task, setTask] = useState({})
    const taskIdx = board.groups[props.groupIdx].tasks.findIndex((t) => {
        return (t._id === props.task._id)
    })

    useEffect(() => {
        setTask(props.task)
    }, [])

    if (!task.checklists) return (<></>)
    return (
        <section>
            {board.groups[props.groupIdx].tasks[taskIdx].checklists.map((checklist, index) => {
                return <section>
                    <CheckList setTask={setTask} key={index} board={board} task={task} checklistIdx={index} taskIdx={taskIdx} groupIdx={props.groupIdx} checklist={checklist} />
                </section>
            })}
        </section>
    )
}
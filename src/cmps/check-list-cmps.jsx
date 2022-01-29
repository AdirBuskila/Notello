import React, {useState} from 'react';
import {CheckListArea} from './check-list-area'
import { utilService } from '../services/util.service';

export const CheckListCmps = (props) => {
    const {board, groupIdx, task, taskIdx} = props;

    if (!task.checklists || task.checklists.length === 0) return (<></>)
    return (
        <section key={utilService.makeId()} >
            {task.checklists.map((checklist, index) => {
                return <section key={utilService.makeId()}>
                    <CheckListArea key={index} board={board} task={task} checklistIdx={index} taskIdx={taskIdx} groupIdx={groupIdx} checklist={checklist} />
                </section>
            })}
        </section>
    )
}
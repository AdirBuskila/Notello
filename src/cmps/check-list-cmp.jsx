import React, {useState} from 'react';
import {CheckList} from '../cmps/checklist'
import { utilService } from '../services/util.service';

export const CheckListCmp = (props) => {
    const {board, groupIdx, task, taskIdx} = props;

    if (!task.checklists || task.checklists.length === 0) return (<></>)
    return (
        <section key={utilService.makeId()} >
            {task.checklists.map((checklist, index) => {
                return <section key={utilService.makeId()}>
                    <CheckList key={index} board={board} task={task} checklistIdx={index} taskIdx={taskIdx} groupIdx={groupIdx} checklist={checklist} />
                </section>
            })}
        </section>
    )
}
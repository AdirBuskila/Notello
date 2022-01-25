import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {CheckList} from '../cmps/checklist'

export const CheckListCmp = (props) => {
    const {board, group, groupIdx, task, taskIdx} = props;
    console.log("task: ", task);

    if (!task.checklists || task.checklists.length === 0) return (<></>)
    return (
        <section>
            {group.tasks[taskIdx].checklists.map((checklist, index) => {
                return <section>
                    <CheckList key={index} board={board} task={task} checklistIdx={index} taskIdx={taskIdx} groupIdx={groupIdx} checklist={checklist} />
                </section>
            })}
        </section>
    )
}
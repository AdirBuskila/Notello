import React from 'react';
import {CheckList} from '../cmps/checklist'

export const CheckListCmp = (props) => {
    const {board, group, groupIdx, task, taskIdx} = props;

    if (!task.checklists || task.checklists.length === 0) return (<></>)
    return (
        <section>
            {task.checklists.map((checklist, index) => {
                return <section>
                    <CheckList key={index} board={board} task={task} checklistIdx={index} taskIdx={taskIdx} groupIdx={groupIdx} checklist={checklist} />
                </section>
            })}
        </section>
    )
}
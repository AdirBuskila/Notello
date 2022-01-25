import React, {useState} from 'react';
import {CheckList} from '../cmps/checklist'

export const CheckListCmp = (props) => {
    const {board, group, groupIdx, task, taskIdx} = props;
    const [isChanged, setIsChanged] = useState(false);

    if (!task.checklists || task.checklists.length === 0) return (<></>)
    return (
        <section>
            {task.checklists.map((checklist, index) => {
                return <section>
                    <CheckList isChanged={isChanged} setIsChanged={setIsChanged} key={index} board={board} task={task} checklistIdx={index} taskIdx={taskIdx} groupIdx={groupIdx} checklist={checklist} />
                </section>
            })}
        </section>
    )
}
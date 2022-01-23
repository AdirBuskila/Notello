import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export const ChecklistBadge = ({checklists}) => {
    let done = 0
    const todos = checklists[0].todos
    todos.forEach((todo)=> {
        if (todo.isDone) done++
    })
    const isDone = (done === todos.length) ? 'checklist-badge done' : 'checklist-badge'
    return (
        <div className={isDone}>
            <CheckBoxOutlinedIcon fontSize='extra-small' color='white'/>
            <p>{done}/{todos.length}</p>
        </div>
    )

}

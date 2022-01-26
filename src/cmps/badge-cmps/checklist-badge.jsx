import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export const ChecklistBadge = ({ checklists }) => {
  let sum = 0
  let doneCounter = 0
  checklists.map((object)=>{
    return object.todos.map((todo)=>{
      sum++
      if (todo.isDone) {
        doneCounter++
      }
    })

  })
  
  const isDone =
  doneCounter === sum ? 'checklist-badge done' : 'checklist-badge';
  const color = doneCounter === sum ? 'white' : 'action'
  return (
    <div className={'flex align-center ' + isDone}>
      <CheckBoxOutlinedIcon fontSize='extra-small' color={color} />
      <p>
        {doneCounter}/{sum}
      </p>
    </div>
  );
};

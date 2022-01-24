import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export const ChecklistBadge = ({ checklists }) => {
  let done = 0;
  const todos = checklists[0].todos;
  todos.forEach((todo) => {
    if (todo.isDone) done++;
  });
  const isDone =
    done === todos.length ? 'checklist-badge done' : 'checklist-badge';
  const color = done === todos.length ? 'white' : 'action'
  return (
    <div className={'flex align-center ' + isDone}>
      <CheckBoxOutlinedIcon fontSize='small' color={color} />
      <p>
        {done}/{todos.length}
      </p>
    </div>
  );
};

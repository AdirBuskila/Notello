import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

export const ChecklistBadge = ({ checklists }) => {
  let done = 0;
  const todos = checklists[0].todos;
  todos.forEach((todo) => {
    if (todo.isDone) done++;
  });
  const isDone =
    done === todos.length ? 'checklist-badge done' : 'checklist-badge';
  return (
    <div className={'flex align-center ' + isDone}>
      <CheckBoxOutlinedIcon fontSize='extra-small' color='action' />
      <p>
        {done}/{todos.length}
      </p>
    </div>
  );
};

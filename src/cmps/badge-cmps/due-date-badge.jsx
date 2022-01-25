import AccessTimeIcon from '@mui/icons-material/AccessTime';

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

export const DueDateBadge = ({ dueDate }) => {
    const date = dueDate[0].date
    const isDone = dueDate[0].isDone
    const newDate = Date.parse(date);
    const date1 = new Date(newDate)
    const month = date1.getMonth()
    const day = date1.getDate()
    const clockColor = (isDone) ? 'white' : 'action'
    const dueDateClass = (isDone) ? 'due-date-badge pointer flex align-center done' : 'due-date-badge pointer flex align-center'
  return (
    <div className={dueDateClass}>
    <AccessTimeIcon fontSize='small' color={clockColor} />
    <span> {months[month]}</span>
    <span> {day}</span>
    </div>
  );
};

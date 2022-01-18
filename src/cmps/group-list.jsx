import {GroupPreview} from './group-preview'

export const GroupList = ({tasks}) => {
    if (!tasks.length) return ( <q>No tasks</q> )
    return (
        <section className='groups-container'>
        {tasks.map(task => <GroupPreview key={task._id} tasks={tasks} /> )}
            </section>
    )
}
import {GroupPreview} from './group-preview'

export const GroupList = ({groups}) => {
    if (!groups.length) return ( <q>No groups</q> )
    return (
        <section className='groups-container'>
        {groups.map(group => <GroupPreview key={group._id} group={group} /> )}
            </section>
    )
}



export const MembersCmp = ({members}) => {
    return (
        <section className='flex' >
        {members.map((member) => {
          return (
            <Avatar
              key={member._id}
              sx={{
                bgcolor: deepPurple[500],
                width: 30,
                height: 30,
                marginInlineEnd: 1,
              }}
            >
              <p>{member.fullname.slice(0, 1)}</p>
            </Avatar>
          );
        })}{' '}
        <div className='add-icon flex align-center justify-center'>
          <AddIcon key={utilService.makeId()} />
        </div>
      </section>
    )
}
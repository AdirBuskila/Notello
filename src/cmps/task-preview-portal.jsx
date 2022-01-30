
import React, {useState, useEffect} from "react"

export const TaskPreviewPortal = (props) => {

    const [pos, setProps] = useState(props.preview);

    // useEffect(() => {
    //     x = props.preview.x,
    //     y = props.preview.y
    // }, [pos])

    return (
        <React.Fragment>
            {console.log(pos)}
        {(pos.x !== 0 || pos.y !== 0) ? <section className='mini-menu-portal' style={{position: 'absolute', top: `${pos.y}`, left: `${pos.x}`}}>
            Im the portal
        </section> : null}
        </React.Fragment>
    )
}
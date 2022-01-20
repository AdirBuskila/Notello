
import React from "react";

export class TaskList extends React.Component {

    render() {
        return (<div {...this.props} ref={this.props.innerRef}>
        </div>
        )
    }
}
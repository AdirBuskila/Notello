import React from "react";


export class GroupPreview extends React.Component {
    state = {
        tasks: [],
    }

    componentDidMount() {
        this.loadTasks()
    }

    loadTasks() {
        const {tasks} = this.state;
        this.setState({tasks});
    }

    render() {
        const {tasks} = this.state;
        if (!tasks || !tasks.length) return ( <q>No tasks to preivew</q> )
        return (
            <div>
                <h2>This is the GroupPreview</h2>
            </div>
        )
    }
}
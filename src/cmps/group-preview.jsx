import React from "react";

export class GroupPreview extends React.Component {
    state = {
        tasks: [],
    }

    componentDidMount() {
        this.loadTasks()
    }

    loadTasks() {
        const { tasks } = this.props.group;
        this.setState({ tasks });
    }

    render() {
        const { tasks } = this.state;
        if (!tasks || !tasks.length) return (<q>No tasks to preivew</q>)
        return (
            <div>
                {tasks.map(task => {
                    return (<div className="task">
                        <p>ID: {task._id}</p>
                        <p>{task.title}</p>
                        <ul>
                            {task.labels.map(label => {
                                return (
                                    <li>{label}</li>
                                )
                            })}
                        </ul>
                    </div>)
                })}
            </div>
        )
    }
}
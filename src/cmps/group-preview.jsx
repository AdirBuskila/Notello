import React from 'react';
import { Card } from './UI/Card';

import { taskService } from '../services/task.service';

export class GroupPreview extends React.Component {
  state = {
    tasks: [],
    isAdding: false,
    newTask: {
      title: '',
      group: this.props.group.title,
    },
  };

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks() {
    const { tasks } = this.props.group;
    this.setState({ tasks });
  }

  onHandleNewCardState = () => {
    const { isAdding } = this.state;
    isAdding
      ? this.setState({ isAdding: false })
      : this.setState({ isAdding: true });
  };

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState((prevState) => ({
      newTask: { ...prevState.newTask, title: value },
    }));
  };

  onAddCard = async () => {
    let { newTask } = this.state;
    try {
      await taskService.save(newTask);
      this.onHandleNewCardState();
      this.loadTasks();
    } catch (err) {
      console.log('Cant add new task');
      throw new Error(err);
    }
  };

  render() {
    const { tasks, isAdding } = this.state;
    if (!tasks || !tasks.length) return <q>No tasks to preivew</q>;
    return (
      <div className='flex column'>
        <div className='task-list-container flex column'>
          {tasks.map((task) => {
            return (
              <Card className='task flex column'>
                {/* <p>ID: {task._id}</p> */}
                <p>{task.title}</p>
                {task.labels && (
                  <ul className='flex'>
                    {task.labels.map((label, idx) => {
                      return (
                        <li
                          key={idx}
                          style={{ backgroundColor: `${label.bgc}` }}>
                          {label.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Card>
            );
          })}
        </div>
        {!isAdding && (
          <button onClick={this.onHandleNewCardState}>+ Add a card</button>
        )}
        {isAdding && (
          <div className='new-card flex column'>
            <textarea
              onChange={this.onHandleChange}
              name='add-card'
              rows='5'
              placeholder='Enter a title for this card...'></textarea>
            <div className='new-card-actions'>
              <button onClick={this.onAddCard}>Add card</button>
              <a href='#' onClick={this.onHandleNewCardState}>
                ✕
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

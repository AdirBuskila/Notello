import React from 'react';
import { connect } from 'react-redux';
import { Card } from './UI/Card';

import { loadTasks } from '../store/actions/task.action'
  //  addTask, removeTask }

// import { utilService } from '../services/util.service';
import { taskService } from '../services/task.service';

class _GroupPreview extends React.Component {
  state = {
    tasks: [],
    isAdding: false,
    newTask: {
      title: '',
      group: ''
    }
  };

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks = async () => {
    // const {tasks} = this.props;
    const { title } = this.props.group;
    try {
      const tasks = await this.props.loadTasks(title)
      this.setState({ tasks });
    } catch (err) {
      console.log('Cant load tasks per group');
      throw new Error(err)
    }
  }

  onHandleNewCardState = () => {
    const { isAdding } = this.state;
    (isAdding) ? this.setState({ isAdding: false }) : this.setState({ isAdding: true })
  }

  onHandleChange = ({ target }) => {
    const value = target.value;
    this.setState(prevState => ({ newTask: { ...prevState.newTask, title: value } }))
  }

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
              <Card key={task._id} className='task flex column'>
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

function mapStateToProps(state) {
  return {
    tasks: state.taskModule.tasks
  }
}

const mapDispatchToProps = {
  loadTasks,
  // addTask,
  // removeTask,
};

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)
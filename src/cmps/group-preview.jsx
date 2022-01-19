import React from 'react';
import { connect } from 'react-redux';

import { Card } from './UI/Card';

import { addTask } from '../store/actions/board.action';
import { boardService } from '../services/board.service';
import { taskService } from '../services/task.service';

class _GroupPreview extends React.Component {
  state = {
    tasks: [],
    isAdding: false,
    newTask: {
      title: '',
    },
  };

  componentDidMount() {
    this.loadTasks();
  }

  loadTasks = () => {
    this.props.onLoadBoard();
    const { tasks } = this.props.group;
    this.setState({ tasks });
  };

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
    const { groupIdx } = this.props;
    try {
      newTask.group = this.props.group.title;
      await this.props.addTask(groupIdx, newTask);
      boardService.save(this.props.board);
      this.setState((prevState) => ({ ...prevState, newTask: { title: '' } }));
      this.loadTasks();
    } catch (err) {
      console.log('Cant add new task');
      throw new Error(err);
    }
    this.onHandleNewCardState();
  };

  render() {
    const { tasks, isAdding } = this.state;
    if (!tasks || tasks.length === 0)
      return (
        <Card className='task flex column'>
          <button>+ Add a list</button>
        </Card>
      );
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

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}

const mapDispatchToProps = {
  addTask,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);

import React from 'react';
import { connect } from 'react-redux';

import { Card } from './UI/Card';
import { TaskPreview } from './task-preview';
// import { addTask } from '../store/actions/board.action';
import { boardService } from '../services/board.service';

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
    console.log('tasks before load', this.state.tasks);
    this.props.onLoadBoard();
    const { tasks } = this.props.group;
    this.setState({ tasks });
    console.log('tasks after', this.state.tasks);
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
    const { group, board } = this.props;
    try {
      // await this.props.addTask(boardId, groupId, newTask);
      await boardService.addTask(board._id, group._id, newTask);
      this.loadTasks();
      this.setState((prevState) => ({ ...prevState, newTask: { title: '' } }));
      console.log(this.state);
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
            return <TaskPreview key={task._id} task={task}></TaskPreview>;
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

// const mapDispatchToProps = {
//   addTask,
// };

export const GroupPreview = connect(
  mapStateToProps
  //   ,
  //   mapDispatchToProps
)(_GroupPreview);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { BoardHeader } from '../cmps/board-header.jsx';

import { GroupList } from '../cmps/group-list.jsx';
import { TaskDetails } from '../pages/task-details';
import { Card } from '../cmps/UI/Card';
import { loadBoard, saveBoard } from '../store/actions/board.action';

const _BoardDetails = (props) => {
  const onLoadBoard = async () => {
    const { id } = props.match.params;
    try {
      await props.loadBoard(id);
      console.log(props.board.style.imgUrl);
    } catch (err) {
      console.log('Cant load current board');
      throw new Error(err);
    }
  };

  useEffect(async () => {
    try {
      await onLoadBoard();
      console.log(props.board.style.imgUrl);
    } catch (err) {
      console.log('Cannot load board', err);
    }
  }, []);

  if (!props.board || props.board.length === 0) {
    console.log('board wast find');
    return <q>Loading...</q>;
  }

  return (
    <div
      className='board-page-container flex column'
      style={{
        backgroundImage: `url(${props.board.style?.imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <AppHeader />
      <BoardHeader onLoadBoard={onLoadBoard} board={props.board} />
      <div className='board-details-container flex column '>
        <GroupList
          onLoadBoard={onLoadBoard}
          board={props.board}
          groups={props.board.groups}
        />
        <Route component={TaskDetails} path={`/b/:boardId/:id`} />
      </div>
    </div>
  );
};

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}

const mapDispatchToProps = {
  loadBoard,
  saveBoard,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);

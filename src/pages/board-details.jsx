import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppHeader } from '../cmps/app-header';
import { BoardHeader } from '../cmps/board-header.jsx';

import { GroupList } from '../cmps/group-list.jsx';
import { loadBoard, saveBoard } from '../store/actions/board.action';

const _BoardDetails = (props) => {
  
  const onLoadBoard = async () => {
    const { id } = props.match.params;
    try {
      await props.loadBoard(id);
    } catch (err) {
      console.log('Cant load current board');
      throw new Error(err);
    }
  };
  
  useEffect( async () => {
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundImage =
      'url(https://res.cloudinary.com/dubjerksn/image/upload/v1642885717/Notello/template4_avwoqv.jpg)';
      try {
        await onLoadBoard();
      } catch (err) {
        console.log('Cannot load board', err);
      }
  }, []);


  if (!props.board || props.board.length === 0) {
    console.log('board wast find');
    return <q>Loading...</q>;
  }
  return (
    <React.Fragment>
      <AppHeader />
      <BoardHeader onLoadBoard={onLoadBoard} board={props.board} />
      <div className='board-details-container flex column '>
        <GroupList
          onLoadBoard={onLoadBoard}
          board={props.board}
          groups={props.board.groups}
        />
      </div>
    </React.Fragment>
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

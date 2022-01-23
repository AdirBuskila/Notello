import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppHeader } from '../cmps/app-header';
import { BoardHeader } from '../cmps/board-header.jsx';

import { GroupList } from '../cmps/group-list.jsx';
import { loadBoard, saveBoard } from '../store/actions/board.action';

const _BoardDetails = (props) => {
  useEffect(() => {
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundImage =
      'url(https://res.cloudinary.com/dubjerksn/image/upload/v1642885717/Notello/template4_avwoqv.jpg)';
    onLoadBoard();
  }, []);

  const onLoadBoard = async () => {
    const { id } = props.match.params;
    try {
      await props.loadBoard(id);
    } catch (err) {
      console.log('Cant load current board');
      throw new Error(err);
    }
  };

  const { board } = props;

  if (!board || board.length === 0) return <q>Loading...</q>;
  return (
    <React.Fragment>
      <AppHeader />
      <BoardHeader onLoadBoard={onLoadBoard} board={board} />
      <div className='board-details-container flex column '>
        <GroupList
          onLoadBoard={onLoadBoard}
          board={board}
          groups={board.groups}
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

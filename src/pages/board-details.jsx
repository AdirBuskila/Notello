import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppHeader } from '../cmps/app-header';
import { BoardHeader } from '../cmps/board-header.jsx';

import { GroupList } from '../cmps/group-list.jsx';
import { loadBoard, saveBoard } from '../store/actions/board.action';

const _BoardDetails = (props) => {
  useEffect(() => {
    onLoadBoard();
  }, []);

  const onLoadBoard = async () => {
    try {
      const { id } = props.match.params;
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
      <BoardHeader board={board} />
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

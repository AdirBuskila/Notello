import React, { useEffect } from 'react';

import { Card } from '../cmps/UI/Card';
import { connect } from 'react-redux';

import { loadBoard } from '../store/actions/board.action';

import { GroupList } from '../cmps/group-list.jsx';

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
    <div className='board-details-container flex column '>
      Welcome To The Board Details Page
      <GroupList onLoadBoard={onLoadBoard} groups={board.groups} />
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
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);

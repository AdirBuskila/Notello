import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../cmps/UI/Card';
import { connect } from 'react-redux';

import { loadBoard } from '../store/actions/board.action';

import { GroupList } from '../cmps/group-list.jsx';

class _BoardDetails extends React.Component {

  state = {
  }

  componentDidMount() {
    this.loadBoard()
  }

  loadBoard = async () => {
    try {
      const { id } = this.props.match.params;
      this.props.loadBoard(id)
    } catch (err) {
      console.log('Cant load current board');
      throw new Error(err);
    }
  }

  render() {
    const { board } = this.props;
    if (!board || board.length === 0) return (<q>Loading...</q>)
    return (
      <Card className='board-details-container flex column '>
        Welcome To The Board Details Page
        <GroupList groups={board.groups} />
      </Card>
    )
  }
}

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}

const mapDispatchToProps = {
  loadBoard,
};

export const BoardDetails = connect(mapStateToProps, mapDispatchToProps)(_BoardDetails);

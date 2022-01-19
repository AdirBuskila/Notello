import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '../cmps/UI/Card';
import { connect } from 'react-redux';

import { loadBoard } from '../store/actions/board.action';

import { GroupList } from '../cmps/group-list.jsx';

class _BoardDetails extends React.Component {
  state = {
    board: {},
  };

  componentDidMount() {
    this.loadBoard();
  }

  loadBoard = async () => {
    const { board } = this.props;
    const { boardId } = this.props.match.params;
    try {
      await this.props.loadBoard(boardId);
      console.log(board);
      this.setState({ board });
    } catch (err) {
      console.log('Cant load board from store');
      throw new Error(err);
    }
  };

  render() {
    const { board } = this.state;
    if (!board || !board.length) return <q>Loading...</q>;
    return (
      <Card className='board-details-container flex column '>
        Welcome To The Board Details Page
        <GroupList groups={board.groups} />
      </Card>
    );
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

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);

import React ,{useState, useEffect} from 'react';
import { render } from '@testing-library/react';
import { Card } from '../cmps/UI/Card';
import { connect, useSelector } from 'react-redux';

import { loadBoard } from '../store/actions/board.action';

import { GroupList } from '../cmps/group-list.jsx';

// export const BoardDetails = () => {
//   const counter = useSelector((state) => state.counter)
//   return <div>{counter}</div>
// }

export const BoardDetails = () => {

  const board = useSelector(state => state.board)
  
  useEffect(() => {
    
    console.log("board: ", board);
  }, [board])
  
  // const [board, setBoard] = useState([]);

    // if (!board || !board.length) return ( <q>Loading...</q> )
    return (
      <Card className='board-details-container flex column '>
        Welcome To The Board Details Page
        {/* <GroupList groups={board.groups} /> */}
      </Card>
    );
  }

// function mapStateToProps({ boardModule }) {
//   return {
//     board: boardModule.board,
//   };
// }

// const mapDispatchToProps = {
//   loadBoard,
// };

// export const BoardDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_BoardDetails);

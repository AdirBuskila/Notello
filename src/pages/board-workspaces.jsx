import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { boardService } from '../services/board.service';
import { Loader } from '../cmps/UI/loader';
import PersonIcon from '@mui/icons-material/Person';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { CreateBoard } from '../cmps/create-board-modal';
import { CreateBoardPopper } from '../cmps/create-board-popper';

export const BoardWorkspaces = () => {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState();
  useEffect(() => {
    (async () => {
      try {
        const boards = await boardService.query();
        setBoards(boards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [newBoard]);
  if (!boards || boards.length === 0) return <Loader />;
  const staredBoards = boards.filter((board) => {
    if (board.isStarred === 'true') {
      return board;
    }
  });
  const regBoards = boards.filter((board) => {
    if (board.isStarred !== 'true') {
      return board;
    }
  });

  return (
    <React.Fragment>
      <AppHeader />

      <div className='board-container flex column '>
        <div className='stared-workspace'>
          <div className='stared-workspace-title flex align-center'>
            <StarRateRoundedIcon className='workspace-logo' />
            <h1>Starred Boards</h1>
          </div>
        </div>
        <div className='boards-container flex'>
          {staredBoards.map((board) => {
            let boardStyle = !board.style.imgUrl
              ? `${board.style.bgColor}`
              : `url(${board.style.imgUrl})`;
            if (!board) return <h1>Loading...</h1>;
            return (
              <Link key={board._id} to={`/b/${board._id}`}>
                <div
                  style={{ backgroundImage: boardStyle }}
                  className='board'>
                  <p className='board-title'>{board.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className='board-workspace-title flex align-center'>
          <PersonIcon className='workspace-logo' />
          <h1> Your Workspaces</h1>
        </div>
        <div className='boards-container flex'>
          {regBoards.map((board) => {
            let boardStyle = !board.style.imgUrl
              ? `${board.style.bgColor}`
              : `url(${board.style.imgUrl})`;
            if (!board) return <h1>Loading...</h1>;
            return (
              <Link key={board._id} to={`/b/${board._id}`}>
                <div
                  style={{ backgroundImage: boardStyle }}
                  className='board'>
                  <p className='board-title'>{board.title}</p>
                </div>
              </Link>
            );
          })}
          <CreateBoardPopper 
          setNewBoard={setNewBoard}
           />
          {/* <div
            className='add-board-container board flex pointer align-center justify-center'
            onClick={() => {
              setNewBoard(true);
            }}>
            <p style={{ filter: 'brightness(100%)' }}></p>
          </div> */}
        </div>
      </div>
      {/* {newBoard && <CreateBoard setNewBoard={setNewBoard} />} */}
    </React.Fragment>
  );
};

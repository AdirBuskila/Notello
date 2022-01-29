import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { boardService } from '../services/board.service';
import { Loader } from '../cmps/loader';
import PersonIcon from '@mui/icons-material/Person';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { CreateBoard } from '../cmps/create-board-modal';

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
  return (
    <React.Fragment>
      <AppHeader />
      <div className='board-container flex column '>
        <div className='board-workspace-title flex align-center'>
          <PersonIcon className='workspace-logo' />
          <h1> Your Workspaces</h1>
        </div>
        <div className='boards-container flex'>
          {boards.map((board) => {
            if (!board) return <h1>Loading...</h1>;
            return (
              <Link key={board._id} to={`/b/${board._id}`}>
                <div
                  // style={{ backgroundImage: `url(${board.style.imgUrl})` }}
                  style={{ backgroundImage: `url(${board.style.imgUrl})` }}
                  className='board flex column align-center'>
                  <p>{board.title}</p>
                </div>
              </Link>
            );
          })}
          <div
            className='add-board-container board flex pointer align-center justify-center'
            onClick={() => {
              setNewBoard(true);
            }}>
            <p style={{ filter: 'brightness(100%)' }}>Create New Board</p>
          </div>
        </div>
        <div className='stared-workspace'>
          <div className='stared-workspace-title flex align-center'>
            <StarRateRoundedIcon className='workspace-logo' />
            <h1>Starred Boards</h1>
          </div>
        </div>
      </div>
      {newBoard && <CreateBoard setNewBoard={setNewBoard} />}
    </React.Fragment>
  );
};

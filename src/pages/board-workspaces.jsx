import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { boardService } from '../services/board.service';
import { Loader } from '../cmps/loader';
import PersonIcon from '@mui/icons-material/Person';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

export const BoardWorkspaces = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const boards = await boardService.query();
        setBoards(boards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
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
        </div>
        <div className='stared-workspace'>
          <div className='stared-workspace-title flex align-center'>
            <StarRateRoundedIcon className='workspace-logo' />
            <h1>Starred Boards</h1>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

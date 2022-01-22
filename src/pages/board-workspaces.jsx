import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { boardService } from '../services/board.service';


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
  if (!boards || !boards.length) return <q>Loading...</q>;
  return (
    <React.Fragment>
      <AppHeader />
      <div className='board-container flex column align-center'>
        <h1>Welcome To The Boards Page</h1>
        {boards.map((board) => {
          return (
            <Link key={board._id} to={`/b/${board._id}`}>
              <div className='board flex column align-center'>
                {board.title}
              </div>
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
};

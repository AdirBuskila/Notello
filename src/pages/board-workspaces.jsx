import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { boardService } from '../services/board.service';

export const BoardWorkspaces = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    document.body.style.backgroundImage = '';
  }, []);
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
  if (!boards || boards.length === 0) return <q>Loading...</q>;
  return (
    <React.Fragment>
      <AppHeader />
      <div className='board-container flex column align-center'>
        <h1>Your Workspaces</h1>
        <div className='boards-container flex'>
          {boards.map((board) => {
            if (!board) return <h1>Loading...</h1>;
            return (
              <Link key={board._id} to={`/b/${board._id}`}>
                <div
                  // style={{ backgroundImage: `url(${board.style.imgUrl})` }}
                  style={{backgroundImage:`url(${board.style.imgUrl})`}}
                  className='board flex column align-center'>
                  <p>{board.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

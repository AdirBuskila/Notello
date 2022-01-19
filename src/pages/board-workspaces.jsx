import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeHeader } from '../cmps/home-header';
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
  console.log(boards);
  if (!boards || !boards.length) return <q>Loading...</q>;
  return (
    <div className='board-container flex column align-center'>
      <HomeHeader / >
      <h1>Welcome To The Board Page</h1>
      {boards.map((board) => {
        return (
          <Link key={board._id} to={`/b/${board._id}`}>
            {board.title}
          </Link>
        )
      })}
    </div>
  );
};

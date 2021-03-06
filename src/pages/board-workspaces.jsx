import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppHeader} from '../cmps/header/app-header';
import {boardService} from '../services/board.service';
import {Loader} from '../cmps/UI/loader';
import PersonIcon from '@mui/icons-material/Person';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import {CreateBoardPopper} from '../cmps/board-cmps/create-board-popper';

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
  const staredBoards = boards.filter(board => board.starred);
  const regBoards = boards.filter(board => !board.starred);

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
          {staredBoards.map(board => {
            let boardStyle = !board.style.imgUrl
              ? `${board.style.bgColor}`
              : `url(${board.style.imgUrl})`;
            if (!board) return <h1>Loading...</h1>;
            return (
              <Link key={board._id} to={`/b/${board._id}`}>
                <div style={{backgroundImage: boardStyle}} className='board'>
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
          {regBoards.map(board => {
            let boardStyle = !board.style.imgUrl
              ? `${board.style.bgColor}`
              : `url(${board.style.imgUrl})`;
            if (!board) return <h1>Loading...</h1>;
            return (
              <Link key={board._id} to={`/b/${board._id}`}>
                <div style={{backgroundImage: boardStyle}} className='board'>
                  <p className='board-title'>{board.title}</p>
                </div>
              </Link>
            );
          })}
          <CreateBoardPopper setNewBoard={setNewBoard} />
        </div>
      </div>
    </React.Fragment>
  );
};

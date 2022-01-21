import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { boardService } from '../services/board.service';
import {ScrollDialog} from './task-details.jsx'


export const BoardWorkspaces = () => {
  const [boards, setBoards] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const teamMembers = [{
    _id: "u101",
    fullname: "Nati Gurevich",
    imgUrl: "https://www.google.com"
  },{
    _id: "u102",
    fullname: "Adir Buskila",
    imgUrl: "https://www.google.com"
}]
const labels = [{
  name: 'Work',
  bgc: '#8E806A'
},
{
  name: 'Relavent',
  bgc: '#F0BB62'
}
]


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
  // console.log(boards);
  if (!boards || !boards.length) return <q>Loading...</q>;
  return (
    <React.Fragment>
      <AppHeader />
      <div className='board-container flex column align-center'>
        <h1>Welcome To The Boards Page</h1>
        <Button
        text='Open' 
        variant='outlined'
        onClick={()=> {setOpenPopup(true)}}
        >Open</Button>
        {boards.map((board) => {
          return (
            <Link key={board._id} to={`/b/${board._id}`}>
              <div className='board flex column align-center'>
                {board.title}
              </div>
            </Link>
          );
        })}
        <ScrollDialog
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          members= {teamMembers}
          title='Drag & Drop'
          labels = {labels}
        ></ScrollDialog>
      </div>
    </React.Fragment>
  );
};

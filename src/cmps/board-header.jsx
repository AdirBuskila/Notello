import React, { useState, useEffect, useRef } from 'react';
import Rating from '@mui/material/Rating';

import { boardService } from '../services/board.service';

import DOWNICON from '../assets/img/down-arrow.png'

export const BoardHeader = (props) => {

  const [currBoard, setCurrBoard] = useState(props.board)

  const onHandleChange = ({ target }) => {
    const value = target.value;

  }


  if (!currBoard) return (<h1> No board </h1>)
  return (
    <section className='flex'>
      <div>
        Board <span><img src={DOWNICON} alt="down-icon" /></span>
      </div>
      <input defaultValue={currBoard.title} onChange={onHandleChange} />
      <Rating name="half-rating" defaultValue={0} precision={1} max={1} />
    </section>
  )
};

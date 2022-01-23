import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { boardService } from '../services/board.service';

export const ActivitySection = (props) => {

    const dispatch = useDispatch();
    const board = useSelector(
        (state) => state.boardModule.board
    );



    return (
        <div className='activity-container flex column'>
            <h4>Im the activity</h4>
        </div>
    );
}

import React from "react";
import { Link } from "react-router-dom";

import { boardService } from "../services/board.service";

export const BoardWorkspaces = async () => {
    const boards = await boardService.query();
    console.log("boards: ", boards);
    if (!boards || !boards.length) return ( <q>Loading...</q> )
      return (
        <div className='board-container flex column align-center'>
          <h1>Welcome To The Board Page</h1>
          {/* {boards.map(board => {
              <Link to={`/b-${board._id}`}>
                {board.title}
                </Link>
          })} */}
        </div>
      ) 
  };
      
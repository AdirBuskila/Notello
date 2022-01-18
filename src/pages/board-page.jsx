import { Link } from "react-router-dom";

export const Board = () => {
    return (
      <div className='board-container flex column align-center'>
        <h1>Welcome To The Board Page</h1>
        <Link to='/board-details'>
           Create a board 
        </Link>
      </div>
    );
  };
      
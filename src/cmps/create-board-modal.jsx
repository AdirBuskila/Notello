import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardService } from '../services/board.service';
export const CreateBoard = (props) => {
  const { setNewBoard } = props;

  const [boardTitle, setBoardTitle] = useState('');
  const [boardColor, setBoardColor] = useState('rgb(0, 121, 191)');
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const dispatch = useDispatch();

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setBoardTitle(value);
  };

  const handleBoardSubmit = () => {
    if (!boardTitle) return;
    const board = {
      title: boardTitle,
      createdAt: Date.now(),
      createdBy: loggedInUser,
      style: {
        bgColor: boardColor,
        imgUrl: '',
      },
    };
    boardService.save(board);
    setNewBoard(false);
  };

  const btnClass = boardTitle === '' ? 'not-allowed' : 'pointer';

  return (
    <div className='over-lay' onClick={() => setNewBoard(false)}>
      <div
        className='add-board-modal flex align-center column'
        onClick={(ev) => ev.stopPropagation()}>
        <div className='create-container flex align-center'>
          <div
            style={{ background: `${boardColor}` }}
            className='create-board-title flex justify-center'>
            <input
              value={boardTitle}
              onChange={onHandleChange}
              placeholder='add board title'></input>
          </div>
          <div className='create-board-colors'>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            160deg,
            rgb(0, 147, 233) 0%,
            rgb(128, 208, 199) 100%
          )`)
              }
              className='board-color-1 pointer'></div>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            62deg,
            rgb(142, 197, 252) 0%,
            rgb(224, 195, 252) 100%
          )`)
              }
              className='board-color-2 pointer'></div>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            45deg,
            rgb(133, 255, 189) 0%,
            rgb(255, 251, 125) 100%
          )`)
              }
              className='board-color-3 pointer'></div>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            19deg,
            rgb(33, 212, 253) 0%,
            rgb(183, 33, 255) 100%
          )`)
              }
              className='board-color-4 pointer'></div>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            225deg,
            rgb(255, 60, 172) 0%,
            rgb(120, 75, 160) 50%,
            rgb(43, 134, 197) 100%
          )`)
              }
              className='board-color-5 pointer'></div>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            19deg,
            rgb(250, 172, 168) 0%,
            rgb(221, 214, 243) 100%
          )`)
              }
              className='board-color-6 pointer'></div>
            <div
              onClick={() =>
                setBoardColor(`linear-gradient(
            160deg,
            rgb(0, 147, 233) 0%,
            rgb(128, 208, 199) 100%
          )`)
              }
              className='board-color-7 pointer'></div>
            <div
              onClick={() => setBoardColor(`rgb(96, 189, 79)`)}
              className='board-color-8 pointer'></div>
            <div
              onClick={() => setBoardColor(`rgb(242, 214, 0)`)}
              className='board-color-9 pointer'></div>
          </div>
        </div>
        <div className='create-button flex'>
          <button className={btnClass} onClick={handleBoardSubmit}>
            Create Board
          </button>
        </div>
      </div>
    </div>
  );
};

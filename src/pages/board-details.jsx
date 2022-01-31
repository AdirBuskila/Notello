import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { AppHeader } from '../cmps/app-header';
import { BoardHeader } from '../cmps/board-header.jsx';
import { Loader } from '../cmps/loader';
import { GroupList } from '../cmps/group-list.jsx';
import { TaskDetails } from '../pages/task-details';
import { BoardActivity } from './board-activity';
import { loadBoard, saveBoard } from '../store/actions/board.action';
import { TaskPreview } from '../cmps/task-preview';
import { TaskPreviewHover } from '../cmps/task-preview-hover';

const _BoardDetails = (props) => {
  const [menuOpen, setMenuOpen] = useState();
  const [previewTask, setPos] = useState(null);
  const { id } = props.match.params;
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);


  const onLoadBoard = async () => {
    try {
      await props.loadBoard(id, loggedInUser);
    } catch (err) {
      console.log('Cant load current board');
      throw new Error(err);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await onLoadBoard();
      } catch (err) {
        console.log('Cannot load board', err);
      }
    })();
  }, [id]);

  if (!props.board || props.board.length === 0) {
    return <Loader />;
  }
  let boardStyle = !props.board.style?.imgUrl
    ? `${props.board.style?.bgColor}`
    : `url(${props.board.style?.imgUrl})`;
  return (
    <React.Fragment>
      {previewTask && (
        <TaskPreviewHover
          board={props.board}
          previewTask={previewTask}
          setPos={setPos}
          onLoadBoard={onLoadBoard}
        />
      )}
      <div
        className='board-page-container flex column'
        style={{
          backgroundImage: boardStyle,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <AppHeader />
        <BoardHeader
          onLoadBoard={onLoadBoard}
          board={props.board}
          setMenuOpen={setMenuOpen}
        />
        <BoardActivity
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          key={props.board._id}
        />
        <div className='board-details-container flex column '>
          <GroupList
            setPos={setPos}
            saveBoard={saveBoard}
            onLoadBoard={onLoadBoard}
            board={props.board}
            groups={props.board.groups}
          />
          <Route component={TaskDetails} path={`/b/:boardId/:id`} />
        </div>
      </div>
    </React.Fragment>
  );
};
function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}
const mapDispatchToProps = {
  loadBoard,
  saveBoard,
};
export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);

import React from "react";
import { Avatar } from "@mui/material";
import { utilService } from "../../services/util.service";


export const ActivityPerTask = (props) => {

    const {board, task} = props;

    return (
        <React.Fragment>
        {board.activities.map((activity) => {
            return (
                <React.Fragment>
                {(activity.task && activity.task._id === task._id) && 
                    <div className='comment flex'>
                      {activity.byMember && (
                        <div className="comment-creator">

                        <Avatar
                          alt='G'
                          src={activity.byMember.imgUrl}
                          style={{
                            width: '32px',
                            height: '32px',
                          }}
                          />
                          </div>
                      )}
                      <div className='flex column'>
                          <span>{activity.byMember.fullname}</span>
                        <span>
                          {utilService.fixTimestamp(activity.createdAt)}
                        </span>
                        <div className='flex column wrap'>
                          <p>{activity.txt}</p>
                        </div>
                      </div>
                    </div>
                }
                </React.Fragment>
            )
        })}
        </React.Fragment>
        )
}
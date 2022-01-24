import * as React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { utilService } from '../../services/util.service';



export const AttachmentsCmp = ({attachments}) => {
    if (attachments.length === 0) return <p></p>;
    return (
        <section className='attachments-main-container'>
            <div className="attachments-header flex">
              <AttachFileIcon />
              <p>Attachments</p>
            </div>
            <div className="attachments-thumbnail-container flex">
            {attachments.map((attachment, index) => {
                return (
                    <div key={index} className="attachment-thumbnail flex">
                        <a>
                        <div  className="attachment-image" style={{backgroundImage: `url(${attachment.url})`}} ></div>
                        </a>
                        <div className="attachment-info">
                        <p className='attachment-txt' >{attachment.txt}</p>
                        <p className='attachment-date'>{utilService.fixTimestamp(attachment.createdAt)}</p>
                        </div>
                    </div>
                )
            })}
            </div>
        </section>
    )
}

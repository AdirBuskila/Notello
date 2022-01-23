import * as React from 'react';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';


export const AttachmentsCmp = ({attachments}) => {
    console.log('attachments', attachments);
    if (!attachments) return <h3>No comments to this task yet..</h3>;
    return (
        <section className='attachments-main-container'>
            <div className="attachments-header">
              <AttachFileIcon color='action' />
              <Typography>Attachment</Typography>
            </div>
            <div className="attachments-thumbnail-container">
            {attachments.map((attachment) => {
                return (
                    <div className="attachment-thumbnail">
                        <img style={{height: '100px'}} src={attachment.url} alt='attachment' />
                        <p>{attachment.txt}</p>
                    </div>
                )
            })}
            </div>
        </section>
    )
}

import AttachFileIcon from '@mui/icons-material/AttachFile';

export const AttachmentsBadge = ({attachments}) => {
    return (
        <div className='attachments-badge flex align-center'>
            <AttachFileIcon fontSize='extra-small' color='action'/>
            <p>{attachments.length}</p>
        </div>
    )

}

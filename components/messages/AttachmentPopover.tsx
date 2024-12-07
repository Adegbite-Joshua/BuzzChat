import React, {  } from 'react';
import { Popover, MenuItem, IconButton } from '@mui/material';
import { AttachFileOutlined, LocationOn, ContactPhone } from '@mui/icons-material';

interface AttachmentPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSelectAttachment: (type: string) => void;
}

const AttachmentPopover: React.FC<AttachmentPopoverProps> = ({ anchorEl, open, onClose, onSelectAttachment }) => {

  const handleSelectAttachment = (type: string) => {
    onSelectAttachment(type);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className="p-2">
        <MenuItem onClick={() => handleSelectAttachment('file')}>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          Attach File
        </MenuItem>
        <MenuItem onClick={() => handleSelectAttachment('location')}>
          <IconButton>
            <LocationOn />
          </IconButton>
          Share Location
        </MenuItem>
        <MenuItem onClick={() => handleSelectAttachment('contact')}>
          <IconButton>
            <ContactPhone />
          </IconButton>
          Share Contact
        </MenuItem>
      </div>
    </Popover>
  );
};

export default AttachmentPopover;

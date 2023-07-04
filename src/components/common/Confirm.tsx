import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material'
import React from 'react';

type Props = {
    open: boolean;
    title: string;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirm: React.FC<Props> = ({open, title, text, onConfirm, onCancel}) => {

    const handleClose = () => {
        onCancel();
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (        
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>NO</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        YES
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Confirm;

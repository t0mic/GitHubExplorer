import React from "react";
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";

const MissingAuthModal = ({ open, close }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="auth-title"
        aria-describedby="auth-description"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Missing Authentification Parameters"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              .env.example.js file in the src folder of this application is missing github access token. You can generate your token
              by going into your GitHub profile settings / developer settings / personal access token.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

MissingAuthModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default MissingAuthModal;
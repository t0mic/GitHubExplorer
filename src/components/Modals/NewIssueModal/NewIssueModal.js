import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const NewIssueModal = ({ open, close, submitNewIssue }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleClicked, setTitleClicked] = useState(false);
  const [descriptionClicked, setDescriptionClicked] = useState(false);
  const submitDisabled = !title || !description;

  const submitIssue = () => {
    submitNewIssue(title, description);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="create-issue-title"
        aria-describedby="create-issue-description"
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"New Issue"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-required"
            label="Title"
            variant="outlined"
            fullWidth
            onFocus={() => setTitleClicked(true)}
            onChange={(e) => setTitle(e.target.value)}
            inputProps={{ maxLength: 60 }} // max title length
            error={titleClicked && !title.length}
            helperText={"Title is required"}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            onFocus={() => setDescriptionClicked(true)}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 5000 }} // max desc length
            error={descriptionClicked && !description.length}
            helperText={"Description is required"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button
            onClick={submitIssue}
            color="primary"
            autoFocus
            disabled={submitDisabled}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NewIssueModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  submitNewIssue: PropTypes.func.isRequired,
};

export default NewIssueModal;
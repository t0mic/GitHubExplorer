import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  h4: {
    textTransform: "uppercase",
    margin: "15px 0",
    fontWeight: "bold",
  },
  root: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const Pagination = ({
  disabledPrevPage,
  disabledNextPage,
  handlePrev,
  handleNext,
}) => {
  const classes = useStyles();

  return (
    <Grid item md={12} sm={12} xs={12}>
      <div className={classes.root}>
        <Button
          variant="contained"
          classes={{ root: classes.button }}
          disabled={disabledPrevPage}
          onClick={handlePrev}
          color="primary"
        >
          Prev
        </Button>
        <Button
          variant="contained"
          classes={{ root: classes.button }}
          disabled={disabledNextPage}
          onClick={handleNext}
          color="primary"
        >
          Next
        </Button>
      </div>
    </Grid>
  );
};

Pagination.propTypes = {
  disabledPrevPage: PropTypes.bool,
  disabledNextPage: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default Pagination;

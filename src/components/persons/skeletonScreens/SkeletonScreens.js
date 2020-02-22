import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  skeletonBox: {
    height: '200px',
    width: '20%',
    padding: '1.5em',
    margin: '1em 2em 5em 2em'
  }
};

const SkeletonScreens = props => {
  const { classes } = props;
  return [...Array(9)].map((_, index) => (
    <div key={index}>
      <Box className={classes.skeletonBox}>
        <Skeleton animation="wave" variant="rect" width={332} height={248} />
        <Skeleton animation="wave" width={200} />
        <Skeleton animation="wave" width={200} />
      </Box>
    </div>
  ));
};

export default withStyles(styles)(SkeletonScreens);

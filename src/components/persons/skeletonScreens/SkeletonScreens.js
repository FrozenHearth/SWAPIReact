import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import '../../../styles/SkeletonScreens/skeletonScreens.css';

const styles = {
  skeletonBox: {
    width: '21%',
    padding: '1.5em 0 0 0',
    margin: '0 2em 1em 2em'
  }
};

const SkeletonScreens = props => {
  const { classes } = props;
  return [...Array(9)].map((_, index) => (
    <div className="skeleton-container" key={index}>
      <Box className={classes.skeletonBox}>
        <Skeleton animation="wave" variant="rect" width={300} height={217} />
        <Skeleton animation="wave" width={200} />
        <Skeleton animation="wave" width={200} />
      </Box>
    </div>
  ));
};

export default withStyles(styles)(SkeletonScreens);

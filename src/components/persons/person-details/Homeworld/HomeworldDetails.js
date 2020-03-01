import React from 'react';
import Typography from '@material-ui/core/Typography';

export const HomeworldDetails = props => {
  const { homeWorldClimate, homeWorldTerrain, homeWorldPopulation } = props;
  return (
    <>
      <Typography component="h2" variant="h6" color="textSecondary">
        <span style={{ fontWeight: 'bold' }}>Population:</span>
        {homeWorldPopulation}
      </Typography>
      <Typography component="h2" variant="h6" color="textSecondary">
        <span style={{ fontWeight: 'bold' }}>Climate:</span>
        {homeWorldClimate}
      </Typography>
      <Typography component="h2" variant="h6" color="textSecondary">
        <span style={{ fontWeight: 'bold' }}>Terrain:</span>
        {homeWorldTerrain}
      </Typography>
    </>
  );
};

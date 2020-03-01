import React from 'react';
import Typography from '@material-ui/core/Typography';

export const CharacterSpecies = props => {
  const { species } = props;
  return (
    <>
      {species
        ? species.map((item, index) => (
            <Typography
              key={index}
              component="h2"
              variant="h6"
              color="textSecondary"
            >
              <span> {item}</span>
            </Typography>
          ))
        : 'NA'}
    </>
  );
};

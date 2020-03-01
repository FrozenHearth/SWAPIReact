import React from 'react';
import Typography from '@material-ui/core/Typography';

export const HomeworldResidents = props => {
  const { residents } = props;
  return (
    <>
      {residents
        ? residents.map((item, index) => (
            <Typography key={index} component="h2" variant="h5">
              <span> {item}</span>
            </Typography>
          ))
        : ''}
    </>
  );
};

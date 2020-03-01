import React from 'react';
import Typography from '@material-ui/core/Typography';

export const CharacterFilms = props => {
  const { films } = props;
  return (
    <>
      {films
        ? films.map((item, index) => (
            <Typography key={index} component="h2" variant="h5">
              <span> {item}</span>
            </Typography>
          ))
        : ''}
    </>
  );
};

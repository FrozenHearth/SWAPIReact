import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../../../styles/Persons/Characters/films.css';

export const CharacterFilms = props => {
  const { films } = props;
  return (
    <div className="character__films__container">
      {films
        ? films.map((item, index) => (
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
    </div>
  );
};

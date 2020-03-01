import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../../../styles/Persons/Characters/starships.css';

export const CharacterStarships = props => {
  const { starships } = props;
  return (
    <div className="character__starships__container">
      {starships
        ? starships.map((item, index) => (
            <Typography
              key={index}
              component="h2"
              variant="h6"
              color="textSecondary"
            >
              <span> {item}</span>
            </Typography>
          ))
        : ''}
    </div>
  );
};

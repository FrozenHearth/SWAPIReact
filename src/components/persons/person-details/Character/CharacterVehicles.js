import React from 'react';
import Typography from '@material-ui/core/Typography';
import '../../../../styles/Persons/Characters/vehicles.css';

export const CharacterVehicles = props => {
  const { vehicles } = props;
  return (
    <div className="character__vehicles__container">
      {vehicles
        ? vehicles.map((item, index) => (
            <Typography
              color="textSecondary"
              key={index}
              component="h2"
              variant="h6"
            >
              <span> {item}</span>
            </Typography>
          ))
        : 'N/A'}
    </div>
  );
};

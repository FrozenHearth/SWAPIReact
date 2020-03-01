import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../../../../styles/Persons/Characters/description.css';

const styles = {
  characterTitle: {
    color: '#ed4b6f',
    textShadow: '0 1px 0 #ccc',
    marginTop: '1em'
  },
  characterHeight: {
    marginTop: '0.5em'
  }
};

export const CharacterDescription = props => {
  const { classes, characterDetails } = props;
  return (
    <div className="description__container">
      <Typography
        color="textSecondary"
        className={classes.characterHeight}
        component="h2"
        variant="h6"
      >
        <span>Height:</span> {characterDetails.height} cm
      </Typography>
      <Typography
        className={classes.personWeight}
        component="h2"
        variant="h6"
        color="textSecondary"
      >
        <span>Weight:</span> {characterDetails.mass} kg
      </Typography>
      <Typography
        className={classes.personWeight}
        component="h2"
        variant="h6"
        color="textSecondary"
      >
        <span>Eye Color:</span> {characterDetails.eye_color}
      </Typography>
      <Typography
        className={classes.personWeight}
        component="h2"
        variant="h6"
        color="textSecondary"
      >
        <span>Birth Year:</span> {characterDetails.birth_year}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(CharacterDescription);

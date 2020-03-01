import React, { Component } from 'react';
import Header from '../../common/Header';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Homeworld from './Homeworld';
import { CharacterFilms } from './CharacterFilms';
import { Logo } from '../../common/Logo';
import { bindActionCreators } from 'redux';
import {
  actionGetPersonDetails,
  actionGetCharacterFilms
} from '../actions/personActions';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import '../../../styles/Logo/logo.css';

const styles = {
  detailsContainer: {
    margin: '5em auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 'auto',
    background: '#fefefe',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
  },
  characterTitle: {
    color: '#ed4b6f',
    textShadow: '0 1px 0 #ccc',
    marginTop: '1em'
  },
  characterHeight: {
    marginTop: '0.5em'
  }
};

class PersonDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterDetails: {},
      characterHomeWorld: '',
      characterFilmsList: [],
      homeWorldResidents: {}
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.actionGetPersonDetails(id).then(details => {
      console.log(details);
      this.setState({
        characterDetails: details,
        characterHomeWorld: details.homeworld
      });
      const films = [...details.films];
      let characterFilmsList = [];

      films.forEach(film => {
        this.props.actionGetCharacterFilms(film).then(res => {
          characterFilmsList.push(res.title);
          this.setState({
            characterFilmsList
          });
        });
      });
    });
  }

  render() {
    const { classes, history, location } = this.props;
    const {
      characterHomeWorld,
      characterDetails,
      characterFilmsList
    } = this.state;
    return (
      <>
        <Header location={location} history={history} />
        <Logo />
        <Container className={classes.detailsContainer} maxWidth="md">
          <Typography
            className={classes.characterTitle}
            component="h2"
            variant="h4"
          >
            {characterDetails.name}
          </Typography>
          <Typography component="h2" variant="h4">
            Description
          </Typography>
          <Typography
            color="textSecondary"
            className={classes.characterHeight}
            component="h2"
            variant="h6"
          >
            <span style={{ fontWeight: 'bold' }}>Height:</span>{' '}
            {characterDetails.height} cm
          </Typography>
          <Typography
            className={classes.personWeight}
            component="h2"
            variant="h6"
            color="textSecondary"
          >
            <span style={{ fontWeight: 'bold' }}>Weight:</span>{' '}
            {characterDetails.mass} kg
          </Typography>
          <Typography
            className={classes.personWeight}
            component="h2"
            variant="h6"
            color="textSecondary"
          >
            <span style={{ fontWeight: 'bold' }}>Hair Color:</span>{' '}
            {characterDetails.hair_color}
          </Typography>
          <Typography
            className={classes.personWeight}
            component="h2"
            variant="h6"
            color="textSecondary"
          >
            <span style={{ fontWeight: 'bold' }}>Skin Color:</span>{' '}
            {characterDetails.skin_color}
          </Typography>
          <Typography
            className={classes.personWeight}
            component="h2"
            variant="h6"
            color="textSecondary"
          >
            <span style={{ fontWeight: 'bold' }}>Eye Color:</span>{' '}
            {characterDetails.eye_color}
          </Typography>
          <Typography
            className={classes.personWeight}
            component="h2"
            variant="h6"
            color="textSecondary"
          >
            <span style={{ fontWeight: 'bold' }}>Birth Year:</span>{' '}
            {characterDetails.birth_year}
          </Typography>
          <Typography
            className={classes.personWeight}
            component="h2"
            variant="h6"
            color="textSecondary"
          >
            <span style={{ fontWeight: 'bold' }}>Films Featured In:</span>{' '}
            <CharacterFilms films={characterFilmsList} />
          </Typography>

          <Divider />
          <Homeworld characterHomeWorld={characterHomeWorld} />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    personDetails: state.personsList.personDetails || {}
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetPersonDetails,
      actionGetCharacterFilms
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PersonDetails));

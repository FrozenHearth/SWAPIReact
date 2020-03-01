import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../common/Header';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Homeworld from './Homeworld/Homeworld';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CharacterDescription from './Character/CharacterDescription';
import { CharacterFilms } from './Character/CharacterFilms';
import { CharacterSpecies } from './Character/CharacterSpecies';
import { CharacterVehicles } from './Character/CharacterVehicles';
import { CharacterStarships } from './Character/CharacterStarships';
import {
  actionGetPersonDetails,
  actionGetCharacterFilms,
  actionGetCharacterSpecies,
  actionGetCharacterVehicles,
  actionGetCharacterStarships
} from '../actions/personActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Logo } from '../../common/Logo';
import '../../../styles/Logo/logo.css';
import '../../../styles/Persons/personDetails.css';

const styles = {
  detailsContainer: {
    margin: '5em auto',
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    background: '#fefefe',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    background: '#fefefe',
    margin: '2em auto'
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
      selectedTab: 'description',
      characterHomeWorld: '',
      characterFilmsList: [],
      characterVehiclesList: [],
      characterSpeciesList: [],
      characterStarshipsList: [],
      homeWorldResidents: {}
    };
  }
  componentDidMount() {
    this.getCharacterDetails();
  }

  getCharacterDetails = () => {
    const { id } = this.props.match.params;
    this.props.actionGetPersonDetails(id).then(details => {
      const characterDetails = { ...details };
      const {
        films,
        species,
        vehicles,
        homeworld,
        starships
      } = characterDetails;
      this.setState({
        characterDetails,
        characterHomeWorld: homeworld
      });

      let characterFilmsList = [],
        characterSpeciesList = [],
        characterVehiclesList = [],
        characterStarshipsList = [];

      films.forEach(film => {
        this.props.actionGetCharacterFilms(film).then(res => {
          characterFilmsList.push(res.title);
          this.setState({
            characterFilmsList
          });
        });
      });

      species.forEach(item => {
        this.props.actionGetCharacterSpecies(item).then(res => {
          characterSpeciesList.push(res.name);
          this.setState({
            characterSpeciesList
          });
        });
      });

      vehicles.forEach(vehicle => {
        this.props.actionGetCharacterVehicles(vehicle).then(res => {
          characterVehiclesList.push(res.name);
          this.setState({
            characterVehiclesList
          });
        });
      });

      starships.forEach(vehicle => {
        this.props.actionGetCharacterStarships(vehicle).then(res => {
          characterStarshipsList.push(res.name);
          this.setState({
            characterStarshipsList
          });
        });
      });
    });
  };

  handleTabClick = (_, clickedTabLabel) => {
    if (clickedTabLabel)
      this.setState({
        selectedTab: clickedTabLabel
      });
  };

  render() {
    const { classes, history, location } = this.props;
    const {
      characterHomeWorld,
      characterDetails,
      characterFilmsList,
      characterSpeciesList,
      characterVehiclesList,
      characterStarshipsList,
      selectedTab
    } = this.state;
    return (
      <>
        <Header location={location} history={history} />
        <Logo />
        <Container maxWidth="md" className={classes.detailsContainer}>
          <div className="container__header">
            <Typography
              className={classes.characterTitle}
              component="h2"
              variant="h4"
            >
              {characterDetails.name}
            </Typography>

            <CharacterSpecies species={characterSpeciesList} />
          </div>

          <Paper className={classes.tabContainer} square>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabClick}
              indicatorColor="secondary"
            >
              <Tab
                className={`${
                  selectedTab === 'description' ? 'active-tab' : ''
                }`}
                value="description"
                label="Description"
              />
              <Tab
                className={`${selectedTab === 'films' ? 'active-tab' : ''}`}
                value="films"
                label="Films Featured In"
              />
              <Tab
                className={`${selectedTab === 'vehicles' ? 'active-tab' : ''}`}
                value="vehicles"
                label="Vehicles"
              />
              <Tab
                className={`${selectedTab === 'starships' ? 'active-tab' : ''}`}
                value="starships"
                label="Starships"
              />
            </Tabs>
          </Paper>

          {selectedTab === 'description' ? (
            <CharacterDescription characterDetails={characterDetails} />
          ) : (
            ''
          )}

          {selectedTab === 'films' ? (
            <CharacterFilms films={characterFilmsList} />
          ) : (
            ''
          )}

          {selectedTab === 'vehicles' ? (
            <CharacterVehicles vehicles={characterVehiclesList} />
          ) : (
            ''
          )}

          {selectedTab === 'starships' ? (
            <CharacterStarships starships={characterStarshipsList} />
          ) : (
            ''
          )}

          <Divider />
        </Container>
        <Container maxWidth="md" className={classes.detailsContainer}>
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
      actionGetCharacterFilms,
      actionGetCharacterSpecies,
      actionGetCharacterVehicles,
      actionGetCharacterStarships
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PersonDetails))
);

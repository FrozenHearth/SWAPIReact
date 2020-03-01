import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { HomeworldFilms } from './HomeworldFilms';
import { HomeworldResidents } from './HomeworldResidents';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../../../styles/Persons/Homeworld/Homeworld.css';

import {
  actionGetCharacterHomeworld,
  actionGetHomeworldFilms,
  actionGetHomeworldResidents
} from '../../actions/personActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { HomeworldDetails } from './HomeworldDetails';

const styles = {
  homeWorldTitle: {
    color: '#ed4b6f'
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    background: '#fefefe',
    margin: '2em auto'
  }
};

class Homeworld extends Component {
  state = {
    homeWorldName: '',
    homeWorldPopulation: 0,
    homeWorldClimate: '',
    homeWorldTerrain: '',
    homeWorldFilmsList: [],
    homeworldResidentsList: [],
    selectedTab: 'description'
  };

  handleTabClick = (_, clickedTabLabel) => {
    if (clickedTabLabel)
      this.setState({
        selectedTab: clickedTabLabel
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { characterHomeWorld } = this.props;
      this.props
        .actionGetCharacterHomeworld(characterHomeWorld)
        .then(homeWorld => {
          const films = [...homeWorld.films];
          const residents = [...homeWorld.residents];
          let homeWorldFilmsList = [];
          let homeworldResidentsList = [];

          films.forEach(film => {
            this.props.actionGetHomeworldFilms(film).then(res => {
              homeWorldFilmsList.push(res.title);
              this.setState({
                homeWorldFilmsList
              });
            });
          });

          residents.forEach(resident => {
            this.props.actionGetHomeworldResidents(resident).then(res => {
              homeworldResidentsList.push(res.name);
              this.setState({
                homeworldResidentsList
              });
            });
          });

          const { name, population, climate, terrain } = homeWorld;
          this.setState({
            homeWorldName: name,
            homeWorldPopulation: population,
            homeWorldClimate: climate,
            homeWorldTerrain: terrain
          });
        });
    }
  }
  render() {
    const {
      homeWorldName,
      homeWorldClimate,
      homeWorldTerrain,
      homeWorldPopulation,
      homeWorldFilmsList,
      homeworldResidentsList,
      selectedTab
    } = this.state;

    const { classes } = this.props;

    return (
      <div className="homeworld__container">
        <Typography
          className={classes.homeWorldTitle}
          component="h2"
          variant="h4"
        >
          {homeWorldName} (Homeworld)
        </Typography>
        <Paper className={classes.tabContainer} square>
          <Tabs
            value={selectedTab}
            onChange={this.handleTabClick}
            indicatorColor="secondary"
          >
            <Tab
              className={`${selectedTab === 'description' ? 'active-tab' : ''}`}
              value="description"
              label="Description"
            />
            <Tab
              className={`${selectedTab === 'movies' ? 'active-tab' : ''}`}
              value="movies"
              label="Movies"
            />
            <Tab
              className={`${selectedTab === 'residents' ? 'active-tab' : ''}`}
              value="residents"
              label="Residents"
            />
          </Tabs>
        </Paper>

        {selectedTab === 'description' ? (
          <HomeworldDetails
            homeWorldClimate={homeWorldClimate}
            homeWorldTerrain={homeWorldTerrain}
            homeWorldPopulation={homeWorldPopulation}
          />
        ) : (
          ''
        )}

        {selectedTab === 'movies' ? (
          <HomeworldFilms films={homeWorldFilmsList} />
        ) : (
          ''
        )}

        {selectedTab === 'residents' ? (
          <HomeworldResidents residents={homeworldResidentsList} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetCharacterHomeworld,
      actionGetHomeworldFilms,
      actionGetHomeworldResidents
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Homeworld));

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { HomeworldFilms } from './HomeworldFilms';
import { HomeworldResidents } from './HomeworldResidents';

import {
  actionGetCharacterHomeworld,
  actionGetHomeworldFilms,
  actionGetHomeworldResidents
} from '../actions/personActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Homeworld extends Component {
  state = {
    homeWorldName: '',
    homeWorldPopulation: 0,
    homeWorldClimate: '',
    homeWorldTerrain: '',
    homeWorldFilmsList: [],
    homeworldResidentsList: []
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
      homeworldResidentsList
    } = this.state;

    return (
      <>
        <Typography component="h2" variant="h4">
          <span style={{ fontWeight: 'bold' }}>Homeworld:</span> {homeWorldName}
        </Typography>
        <Typography component="h2" variant="h5">
          <span style={{ fontWeight: 'bold' }}>Population:</span>
          {homeWorldPopulation}
        </Typography>
        <Typography component="h2" variant="h5">
          <span style={{ fontWeight: 'bold' }}>Climate:</span>
          {homeWorldClimate}
        </Typography>
        <Typography component="h2" variant="h5">
          <span style={{ fontWeight: 'bold' }}>Terrain:</span>
          {homeWorldTerrain}
        </Typography>
        <Typography component="h2" variant="h5">
          <span style={{ fontWeight: 'bold' }}>Movies :</span>
          <HomeworldFilms films={homeWorldFilmsList} />
        </Typography>
        <Typography component="h2" variant="h5">
          <span style={{ fontWeight: 'bold' }}>Residents :</span>
          <HomeworldResidents residents={homeworldResidentsList} />
        </Typography>
      </>
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

export default connect(null, mapDispatchToProps)(Homeworld);

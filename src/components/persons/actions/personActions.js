import {
  GET_ALL_PEOPLE,
  GET_PERSON_DETAILS,
  GET_CHARACTER_HOMEWORLD,
  GET_HOMEWORLD_FILMS,
  GET_HOMEWORLD_RESIDENTS,
  GET_CHARACTER_FILMS,
  GET_CHARACTER_SPECIES,
  GET_CHARACTER_VEHICLES,
  GET_CHARACTER_STARSHIPS
} from '../actionTypes/types';
import axios from 'axios';
import { base_URL } from '../../../constants/index';

export const actionGetAllPeople = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${base_URL}/people`);
      dispatch({
        type: GET_ALL_PEOPLE,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetPersonDetails = url => {
  return async dispatch => {
    try {
      const res = await axios.get(`${base_URL}/people/${url}`);
      dispatch({
        type: GET_PERSON_DETAILS,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetCharacterFilms = films_featured => {
  return async dispatch => {
    try {
      const res = await axios.get(`${films_featured}`);
      dispatch({
        type: GET_CHARACTER_FILMS,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetCharacterSpecies = species => {
  return async dispatch => {
    try {
      const res = await axios.get(`${species}`);
      dispatch({
        type: GET_CHARACTER_SPECIES,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetCharacterVehicles = vehicles => {
  return async dispatch => {
    try {
      const res = await axios.get(`${vehicles}`);
      dispatch({
        type: GET_CHARACTER_VEHICLES,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetCharacterStarships = starships => {
  return async dispatch => {
    try {
      const res = await axios.get(`${starships}`);
      dispatch({
        type: GET_CHARACTER_STARSHIPS,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetCharacterHomeworld = homeworld_url => {
  return async dispatch => {
    try {
      const res = await axios.get(`${homeworld_url}`);
      dispatch({
        type: GET_CHARACTER_HOMEWORLD,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetHomeworldFilms = films => {
  return async dispatch => {
    try {
      const res = await axios.get(`${films}`);
      dispatch({
        type: GET_HOMEWORLD_FILMS,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const actionGetHomeworldResidents = residents => {
  return async dispatch => {
    try {
      const res = await axios.get(`${residents}`);
      dispatch({
        type: GET_HOMEWORLD_RESIDENTS,
        payload: res
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

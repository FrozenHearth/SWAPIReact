import { GET_ALL_PEOPLE } from '../actionTypes/types';

import axios from 'axios';

const base_URL = `https://swapi.co/api`;

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

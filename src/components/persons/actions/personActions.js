import { GET_ALL_PEOPLE, GET_PERSON_DETAILS } from '../actionTypes/types';
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

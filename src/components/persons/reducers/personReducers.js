import { GET_ALL_PEOPLE, GET_PERSON_DETAILS } from '../actionTypes/types';

const initialState = {
  data: [],
  personDetails: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PEOPLE:
      state.data = action.payload.data;
      return { ...state };
    case GET_PERSON_DETAILS:
      state.personDetails = action.payload.data;
      return { ...state };
    default:
      return state;
  }
};

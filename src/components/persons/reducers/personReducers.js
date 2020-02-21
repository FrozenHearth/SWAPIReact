import { GET_ALL_PEOPLE } from '../actionTypes/types';

const initialState = {
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PEOPLE:
      state.data = action.payload.data;
      //   const { results } = action.payload.data;
      return { ...state };
    default:
      return state;
  }
};

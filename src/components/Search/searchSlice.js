import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://hn.algolia.com/api/v1/search";
const hitsPerPage = 5;

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
    cursor: 0,
  },
  reducers: {
    add: (state, action) => {
      state.data = state.data.concat(action.payload);
      //We mutate directly becaue it's using immer.js under the hood and return a new object
      state.cursor += action.payload.length;
    },
    search: (state, action) => {
      state.data = action.payload;
      state.cursor = action.payload.length;
    },
    reset: (state) => {
      state.data = [];
      state.cursor = 0;
    },
  },
});

export const { add, search, reset } = searchSlice.actions;

export const doSearch = (query) => (dispatch) => {
  axios
    .get(url, {
      params: {
        query,
        page: 0,
        hitsPerPage,
      },
    })
    .then((res) => dispatch(search(res.data.hits)))
    .catch((err) => console.log(`do something with ${err}`));
};

export const doSearchMore = (query) => (dispatch, getState) => {
  const cursor = selectCursor(getState());
  axios
    .get(url, {
      params: {
        query,
        page: cursor,
        hitsPerPage,
      },
    })
    .then((res) => dispatch(add(res.data.hits)))
    .catch((err) => console.log(`do something with ${err}`));
};

export const doReset = () => (dispatch) => {
  dispatch(reset());
};

export const selectSearchResults = (state) => state.search.data;
export const selectCursor = (state) => state.search.cursor;
export const selectArticle = (state, id) =>
  state.search.data.find((art) => art.objectID === id);

export default searchSlice.reducer;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  doSearch,
  doSearchMore,
  doReset,
  selectSearchResults,
} from "./searchSlice";
import List from "./List";

const useStyles = makeStyles(() => ({
  form: {
    margin: "20px 0px",
    position: "sticky",
    top: 0,
    background: "white",
    zIndex: 2,
    //width: "100%",
  },
  loadMoreContainer: {
    margin: "20px 0px",
  },
  loadMoreButton: {
    overflowAnchor: "none",
  },
}));

const Search = () => {
  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => selectSearchResults(state));
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(doSearch(query));
        }}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={8}>
            <TextField
              label="Search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              variant="outlined"
              autoFocus
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                dispatch(doSearch(query));
              }}
              fullWidth
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => {
                setQuery("");
                dispatch(doReset());
              }}
              fullWidth
              variant="contained"
              color="primary"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
      <List searchResults={searchResults} />
      {searchResults.length > 0 && (
        <Grid className={classes.loadMoreContainer} container justify="center">
          <Button
            className={classes.loadMoreButton}
            onClick={() => dispatch(doSearchMore(query))}
            variant="contained"
            color="primary"
          >
            Load more
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Search;

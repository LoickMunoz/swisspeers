import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";

import {
  doSearch,
  doSearchMore,
  doReset,
  selectSearchResults,
} from "./searchSlice";
import List from "./List";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchResults = useSelector((state) => selectSearchResults(state));
  const dispatch = useDispatch();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(doSearch(query));
        }}
      >
        <TextField
          label="Search"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <Button
          onClick={() => {
            dispatch(doSearch(query));
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setQuery("");
            dispatch(doReset());
          }}
        >
          Reset
        </Button>
      </form>
      <List searchResults={searchResults} />
      {searchResults.length > 0 && (
        <Button onClick={() => dispatch(doSearchMore(query))}>Load more</Button>
      )}
    </>
  );
};

export default Search;

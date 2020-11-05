import React from "react";
import { Link } from "react-router-dom";

const List = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((res) => (
        <div>
          <div key={res.objectID}>title: {res.title}</div>
          <Link to={`/detail/${res.objectID}`}>go detail</Link>
        </div>
      ))}
    </div>
  );
};

export default List;

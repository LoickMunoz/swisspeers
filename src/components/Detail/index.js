import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectArticle } from "../Search/searchSlice";

const Detail = () => {
  let { id } = useParams();
  const article = useSelector((state) => selectArticle(state, id));
  return (
    <div>
      <Link to="/">go back</Link>
      <div>detail : {id}</div>
      <div>title : {article.title}</div>
    </div>
  );
};

export default Detail;

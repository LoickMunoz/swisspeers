import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import { selectArticle } from "../Search/searchSlice";

const useStyles = makeStyles(() => ({
  container: {
    margin: "20px 0px",
  },
}));

const Detail = () => {
  const history = useHistory();
  let { id } = useParams();
  const article = useSelector((state) => selectArticle(state, id));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/")}
      >
        go back
      </Button>
      {article ? (
        <ul>
          <li>id : {article.objectID}</li>
          <li>created at : {article.created_at}</li>
          <li>
            url : {article.url}{" "}
            <a href={article.url} target="_blank" rel="noreferrer">
              link
            </a>
          </li>
          <li>title : {article.title}</li>
          <li>author : {article.author}</li>
          <li>points : {article.points}</li>
          <li>number of comments : {article.num_comments}</li>
          <li>relevancy score : {article.relevancy_score}</li>
          <li>
            tags :{" "}
            {article._tags.reduce(
              (acc, tag, ind) => (ind === 0 ? tag : (acc += `, ${tag}`)),
              ""
            )}
          </li>
        </ul>
      ) : (
        <p>Nothing there</p>
      )}
    </div>
  );
};

export default Detail;

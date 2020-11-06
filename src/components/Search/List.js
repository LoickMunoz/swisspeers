import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const List = ({ searchResults }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid container direction="row" alignItems="stretch" spacing={3}>
      {searchResults.map((res) => (
        <Grid key={res.objectID} item xs={12} md={6} lg={4}>
          <Card className={classes.card}>
            <CardHeader title={res.title} subheader={res.author}></CardHeader>
            <CardContent>Comments : {res.num_comments}</CardContent>
            <CardActions>
              <Button
                onClick={() => history.push(`/detail/${res.objectID}`)}
                color="secondary"
                variant="contained"
              >
                details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default List;

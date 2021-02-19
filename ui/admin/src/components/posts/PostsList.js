import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PageWrapper from "../../common/PageWrapper";
import { useQuery } from "react-apollo";
import { POSTS_QUERY } from "./model";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bold: {
    fontWeight: "bold",
  },
});

const PostsList = () => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(POSTS_QUERY);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.log({ error });
  }

  const posts = data.posts || [];
  return (
    <PageWrapper title={"Posts"} newPath="/posts/new">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.bold}>ID</TableCell>
              <TableCell className={classes.bold} align="right">
                Title EN
              </TableCell>
              <TableCell className={classes.bold} align="right">
                Title GR
              </TableCell>
              <TableCell className={classes.bold} align="right">
                Created at
              </TableCell>
              <TableCell className={classes.bold} align="right">
                Updated at
              </TableCell>
              <TableCell className={classes.bold} align="right">
                Author
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell component="th" scope="row">
                  {post.id}
                </TableCell>
                <TableCell align="right">{post.title_en}</TableCell>
                <TableCell align="right">{post.title_gr}</TableCell>
                <TableCell align="right">{post.created_at}</TableCell>
                <TableCell align="right">{post.updated_at}</TableCell>
                <TableCell align="right">{post?.author?.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageWrapper>
  );
};

export default PostsList;

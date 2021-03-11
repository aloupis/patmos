import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { Grid } from '@material-ui/core';
import PageWrapper from '../../common/PageWrapper';
import PostForm from './PostForm';
import Loading from '../../common/Loading';
import DeleteConfirmationButton from '../../common/DeleteConfirmationButton';

import {
  POST_BY_PK_QUERY,
  UPDATE_POST_MUTATION,
  DELETE_POST_MUTATION,
} from './model';

const EditPost = ({ history, match }) => {
  const { data, loading, error } = useQuery(POST_BY_PK_QUERY, {
    variables: { id: +match.params.id },
  });

  const [updatePost] = useMutation(UPDATE_POST_MUTATION);
  const handleSave = async (post) => {
    await updatePost({
      variables: {
        id: +match.params.id,
        set: {
          title_en: post.title_en,
          content_en: post.content_en,
          title_gr: post.title_gr,
          content_gr: post.content_gr,
        },
      },
      refetchQueries: [`POSTS_QUERY`],
    });
    return history.push(`/posts`);
  };
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const handleDelete = async () => {
    const res = await deletePost({ variables: { id: +match.params.id } });
    return history.push(`/posts`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Edit Post" maxWidth="lg" goBackBtn="/posts">
      <Grid container direction="row" justify="flex-end" alignItems="baseline">
        <DeleteConfirmationButton
          component="fab"
          size="medium"
          onConfirm={handleDelete}
        />
      </Grid>
      <PostForm onSave={handleSave} post={data.post_by_pk} history={history} />
    </PageWrapper>
  );
};

EditPost.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default EditPost;

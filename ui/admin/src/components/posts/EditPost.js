import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { Grid } from '@material-ui/core';
import PageWrapper from '../../common/PageWrapper';
import PostForm from './PostForm';
import Loading from '../../common/Loading';
import DeleteConfirmationButton from '../../common/DeleteConfirmationButton';
import AssetContainer from '../../common/gallery/AssetContainer';
import { SnackbarContext } from '../../SnackbarContext';

import {
  POST_BY_PK_QUERY,
  UPDATE_POST_MUTATION,
  DELETE_POST_MUTATION,
} from './model';

const EditPost = ({ history, match }) => {
  const { data, loading, error } = useQuery(POST_BY_PK_QUERY, {
    variables: { id: +match.params.id },
  });
  const [imagePublicId, setImagePublicId] = useState('');

  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);

  const [updatePost] = useMutation(UPDATE_POST_MUTATION);
  const handleSave = async (post) => {
    try {
      await updatePost({
        variables: {
          id: +match.params.id,
          set: {
            title_en: post.title_en,
            content_en: post.content_en,
            title_gr: post.title_gr,
            content_gr: post.content_gr,
            image_public_id: imagePublicId,
            summary_en: post.summary_en,
            summary_gr: post.summary_gr,
          },
        },
        refetchQueries: [`POSTS_QUERY`],
      });
      showMessage('Post has been successfully updated!');
      return history.push(`/posts`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };
  const [deletePost] = useMutation(DELETE_POST_MUTATION);
  const handleDelete = async () => {
    try {
      const res = await deletePost({ variables: { id: +match.params.id } });
      if (res?.data?.delete_post?.success) {
        showMessage('Post has been successfully deleted!');
      } else {
        showGenericErrorMessage();
      }

      return history.push(`/posts`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Edit Post" maxWidth="lg" goBackBtn="/posts">
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="baseline"
        style={{ marginBottom: '10px' }}
      >
        <DeleteConfirmationButton
          component="fab"
          size="medium"
          onConfirm={handleDelete}
        />
      </Grid>

      <AssetContainer
        url={`posts/${match.params.id}`}
        acceptedFileTypes="image/jpeg,image/png,image/gif"
        updateEntity={setImagePublicId}
      />

      <PostForm onSave={handleSave} post={data.post_by_pk} history={history} />
    </PageWrapper>
  );
};

EditPost.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default EditPost;

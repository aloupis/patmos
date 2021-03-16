import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import PostForm from './PostForm';
import { SnackbarContext } from '../../SnackbarContext';

import { CREATE_POST_MUTATION } from './model';

const NewPost = (props) => {
  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);
  const { history } = props;

  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const handleSave = async (post) => {
    try {
      const {
        data: {
          insert_post: { id },
        },
      } = await createPost({
        variables: {
          input: {
            title_en: post.title_en,
            content_en: post.content_en,
            title_gr: post.title_gr,
            content_gr: post.content_gr,
          },
        },
      });

      showMessage('Post has been successfully created !');

      return history.push(`/posts/${id}`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  return (
    <PageWrapper title="New Post" maxWidth="lg" goBackBtn="/posts">
      <PostForm onSave={handleSave} history={history} />
    </PageWrapper>
  );
};

NewPost.propTypes = {
  history: PropTypes.object,
};

export default NewPost;

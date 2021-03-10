import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import PostForm from './PostForm';
import { CREATE_POST_MUTATION } from './model';

const NewPost = (props) => {
  const { history } = props;

  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const handleSave = async (post) => {
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
      refetchQueries: [`POSTS_QUERY`],
    });

    // return history.push(`/master-data/suppliers/${result.id}`, {
    //   message: t('GENERIC.MESSAGES.SAVE_SUCCESSFUL'),
    // });
    return history.push(`/posts/${id}`);
  };

  return (
    <PageWrapper title="New Post" maxWidth="lg" goBackBtn="/posts">
      <PostForm onSave={handleSave} />
    </PageWrapper>
  );
};

NewPost.propTypes = {
  history: PropTypes.object,
};

export default NewPost;

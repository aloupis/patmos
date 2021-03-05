import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-apollo';
import PageWrapper from '../../common/PageWrapper';
import PostForm from './PostForm';
import Loading from '../../common/Loading';

import { POST_BY_PK_QUERY, UPDATE_POST_MUTATION } from './model';

const EditPost = ({ match }) => {
  const { data, loading, error } = useQuery(POST_BY_PK_QUERY, {
    variables: { id: +match.params.id },
  });
  console.log({ data, id: match.params.id });
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
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Edit Post" maxWidth="lg" goBackBtn="/posts">
      <PostForm onSave={handleSave} post={data.post_by_pk} />
    </PageWrapper>
  );
};

EditPost.propTypes = {
  match: PropTypes.object,
};

export default EditPost;

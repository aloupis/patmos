import React from 'react';
import { useMutation } from 'react-apollo';
import PageWrapper from '../../common/PageWrapper';
import PostForm from './PostForm';
import { CREATE_POST_MUTATION } from './model';

const NewPost = (props) => {
  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const handleSave = async (post) => {
    try {
      const { data } = await createPost({
        variables: {
          title_en: post.title_en,
          content_en: post.content_en,
          title_gr: post.title_gr,
          content_gr: post.content_gr,
        },
        refetchQueries: [`POSTS_QUERY`],
      });
      console.log({ data });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <PageWrapper title="New Post" maxWidth="lg" goBackBtn="/posts">
      <PostForm onSave={handleSave} />
    </PageWrapper>
  );
};

export default NewPost;

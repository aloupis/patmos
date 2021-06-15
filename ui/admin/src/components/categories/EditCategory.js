import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../../common/PageWrapper';
import CategoryForm from './CategoryForm';
import Loading from '../../common/Loading';
import DeleteConfirmationButton from '../../common/DeleteConfirmationButton';
import { SnackbarContext } from '../../SnackbarContext';
import AssetContainer from '../../common/gallery/AssetContainer';

import {
  CATEGORY_BY_PK_QUERY,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
} from './model';

const EditCategory = ({ history, match }) => {
  const { data, loading, error } = useQuery(CATEGORY_BY_PK_QUERY, {
    variables: { id: +match.params.id },
  });
  const [imagePublicId, setImagePublicId] = useState('');

  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);

  const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);
  const handleSave = async (category) => {
    try {
      await updateCategory({
        variables: {
          id: +match.params.id,
          set: {
            name_en: category.name_en,
            description_en: category.description_en,
            name_gr: category.name_gr,
            description_gr: category.description_gr,
            image_public_id: imagePublicId,
            summary_en: category.summary_en,
            summary_gr: category.summary_gr,
          },
        },
        refetchQueries: [`CATEGORIES_QUERY`],
      });
      showMessage('Category has been successfully updated!');
      return history.push(`/categories`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION);
  const handleDelete = async () => {
    try {
      const res = await deleteCategory({ variables: { id: +match.params.id } });
      if (res?.data?.delete_category?.success) {
        showMessage('Category has been successfully deleted!');
      } else {
        showGenericErrorMessage();
      }

      return history.push(`/categories`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Edit Category" maxWidth="lg" goBackBtn="/categories">
      <Grid container direction="row" justify="flex-end" alignItems="baseline">
        <DeleteConfirmationButton
          component="fab"
          size="medium"
          onConfirm={handleDelete}
        />
      </Grid>
      <div style={{ marginBottom: '15px' }}>
        <Typography variant="h6">Image</Typography>
      </div>
      <AssetContainer
        url={`categories/${match.params.id}`}
        acceptedFileTypes="image/jpeg,image/png,image/gif"
        updateEntity={setImagePublicId}
      />
      <div style={{ marginBottom: '10px' }} />
      <CategoryForm
        onSave={handleSave}
        category={data.category_by_pk}
        history={history}
      />
    </PageWrapper>
  );
};

EditCategory.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default EditCategory;

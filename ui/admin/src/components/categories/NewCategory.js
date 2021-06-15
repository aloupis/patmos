import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import CategoryForm from './CategoryForm';
import { SnackbarContext } from '../../SnackbarContext';

import { CREATE_CATEGORY_MUTATION } from './model';

const NewCategory = (props) => {
  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);
  const { history } = props;

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION);
  const handleSave = async (category) => {
    try {
      const {
        data: {
          insert_category: { id },
        },
      } = await createCategory({
        variables: {
          input: {
            name_en: category.name_en,
            description_en: category.description_en,
            name_gr: category.name_gr,
            description_gr: category.description_gr,
            summary_en: category.summary_en,
            summary_gr: category.summary_gr,
          },
        },
      });

      showMessage('Category has been successfully created !');

      return history.push(`/categories/${id}`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  return (
    <PageWrapper title="New Category" maxWidth="lg" goBackBtn="/categories">
      <CategoryForm onSave={handleSave} history={history} />
    </PageWrapper>
  );
};

NewCategory.propTypes = {
  history: PropTypes.object,
};

export default NewCategory;

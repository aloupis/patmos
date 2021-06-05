import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import ServiceForm from './ServiceForm';
import { SnackbarContext } from '../../SnackbarContext';

import { CREATE_SERVICE_MUTATION } from './model';

const NewService = (props) => {
  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);
  const { history } = props;

  const [createService] = useMutation(CREATE_SERVICE_MUTATION);
  const handleSave = async (service) => {
    try {
      const {
        data: {
          insert_service: { id },
        },
      } = await createService({
        variables: {
          input: {
            name_en: service.name_en,
            content_en: service.content_en,
            name_gr: service.name_gr,
            content_gr: service.content_gr,
            category_id: +service.category_id,
            price: +service.price,
          },
        },
      });

      showMessage('Service has been successfully created !');

      return history.push(`/services/${id}`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  return (
    <PageWrapper title="New Service" maxWidth="lg" goBackBtn="/services">
      <ServiceForm onSave={handleSave} history={history} />
    </PageWrapper>
  );
};

NewService.propTypes = {
  history: PropTypes.object,
};

export default NewService;

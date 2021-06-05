import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { Grid } from '@material-ui/core';
import PageWrapper from '../../common/PageWrapper';
import ServiceForm from './ServiceForm';
import Loading from '../../common/Loading';
import DeleteConfirmationButton from '../../common/DeleteConfirmationButton';
import { SnackbarContext } from '../../SnackbarContext';

import {
  SERVICE_BY_PK_QUERY,
  UPDATE_SERVICE_MUTATION,
  DELETE_SERVICE_MUTATION,
} from './model';

const EditService = ({ history, match }) => {
  const { data, loading, error } = useQuery(SERVICE_BY_PK_QUERY, {
    variables: { id: +match.params.id },
  });
  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);

  const [updateService] = useMutation(UPDATE_SERVICE_MUTATION);
  const handleSave = async (service) => {
    try {
      await updateService({
        variables: {
          id: +match.params.id,
          set: {
            name_en: service.name_en,
            content_en: service.content_en,
            name_gr: service.name_gr,
            content_gr: service.content_gr,
            category_id: +service.category_id,
            price: +service.price,
          },
        },
        refetchQueries: [`SERVICES_QUERY`],
      });
      showMessage('Service has been successfully updated!');
      return history.push(`/services`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };
  const [deleteService] = useMutation(DELETE_SERVICE_MUTATION);
  const handleDelete = async () => {
    try {
      const res = await deleteService({ variables: { id: +match.params.id } });
      if (res?.data?.delete_service?.success) {
        showMessage('Service has been successfully deleted!');
      } else {
        showGenericErrorMessage();
      }

      return history.push(`/services`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Edit Service" maxWidth="lg" goBackBtn="/services">
      <Grid container direction="row" justify="flex-end" alignItems="baseline">
        <DeleteConfirmationButton
          component="fab"
          size="medium"
          onConfirm={handleDelete}
        />
      </Grid>
      <ServiceForm
        onSave={handleSave}
        service={data.service_by_pk}
        history={history}
      />
    </PageWrapper>
  );
};

EditService.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default EditService;

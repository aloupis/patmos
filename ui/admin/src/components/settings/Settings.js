import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../../common/PageWrapper';
import SettingsForm from './SettingsForm';
import Loading from '../../common/Loading';
import { SnackbarContext } from '../../SnackbarContext';
import AssetContainer from '../../common/gallery/AssetContainer';

import { SETTINGS_QUERY, UPDATE_SETTINGS_MUTATION } from './model';

const Settings = ({ history }) => {
  const { data, loading, error } = useQuery(SETTINGS_QUERY);
  const [imagePublicId, setImagePublicId] = useState('');

  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);

  const [updateSettings] = useMutation(UPDATE_SETTINGS_MUTATION);
  const handleSave = async (settings) => {
    try {
      await updateSettings({
        variables: {
          set: {
            about_us_title_gr: settings.about_us_title_gr,
            about_us_title_en: settings.about_us_title_en,
            about_us_content_gr: settings.about_us_content_gr,
            about_us_content_en: settings.about_us_content_en,
            about_us_image_public_id: imagePublicId,
          },
        },
        refetchQueries: [`SETTINGS_QUERY`],
      });
      showMessage('Settings have been successfully updated!');
      return history.push(`/settings`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Settings" maxWidth="lg">
      <div style={{ marginBottom: '15px' }}>
        <Typography variant="h6">About Us</Typography>
      </div>
      <AssetContainer
        url="about-us"
        acceptedFileTypes="image/jpeg,image/png,image/gif"
        updateEntity={setImagePublicId}
      />
      <div style={{ marginBottom: '10px' }} />
      <SettingsForm
        onSave={handleSave}
        settings={data.settings}
        history={history}
      />
    </PageWrapper>
  );
};

Settings.propTypes = {
  history: PropTypes.object,
};

export default Settings;

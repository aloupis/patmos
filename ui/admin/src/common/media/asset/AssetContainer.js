import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { uploadAssets, getAsset, deleteAsset } from '../../../services/asset';
import Upload from './Upload';
import GalleryStyles from '../common/styles';
import AssetPreview from './AssetPreview';

const useStyles = makeStyles(GalleryStyles);

const AssetContainer = ({ url, publicId, acceptedFileTypes, updateEntity }) => {
  const classes = useStyles();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (publicId) {
      getAsset(publicId).then(({ data }) => {
        setAsset(JSON.parse(data));
        setLoading(false);
      });
    }
    setLoading(false);
  }, [publicId]);

  const handleUpload = (files) => {
    setLoading(true);
    uploadAssets(files, url).then(({ data }) => {
      setAsset(() => {
        setLoading(false);
        updateEntity(JSON.parse(data)[0].public_id);
        return JSON.parse(data)[0];
      });
    });
  };

  const handleDelete = (key) => {
    setLoading(true);
    deleteAsset(key).then(() => {
      setAsset(null);
      setLoading(false);
    });
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      spacing={3}
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {loading && (
        <Grid item xs={12}>
          <LinearProgress color="secondary" />
        </Grid>
      )}
      <Grid item xs={4}>
        <Typography variant="h6">Preview Image</Typography>
      </Grid>
      <Grid item xs={8}>
        <Upload
          url={url}
          handleUpload={handleUpload}
          acceptedFileTypes={acceptedFileTypes}
        />
        {asset && (
          <AssetPreview
            classes={classes}
            loading={loading}
            asset={asset}
            handleDelete={handleDelete}
          />
        )}
      </Grid>
    </Grid>
  );
};

AssetContainer.propTypes = {
  url: PropTypes.string,
  publicId: PropTypes.string,
  acceptedFileTypes: PropTypes.string,
  updateEntity: PropTypes.func,
};

export default AssetContainer;

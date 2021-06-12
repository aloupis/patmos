import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { uploadAssets, listAssets, deleteAsset } from '../../services/asset';
import UploadArea from './UploadArea';
import SingleAssetUpload from './SingleAssetUpload';
import GalleryStyles from './styles';
import AssetPreview from './AssetPreview';

const useStyles = makeStyles(GalleryStyles);

const AssetContainer = ({ url, allowMultipleAssets, acceptedFileTypes }) => {
  const classes = useStyles();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      listAssets(url).then(({ data }) => {
        setAssets(JSON.parse(data));
        setLoading(false);
      }),
    [url]
  );

  const handleUpload = (files, shouldReplace) => {
    setLoading(true);
    uploadAssets(files, url).then(({ data }) => {
      setAssets((prev) => {
        setLoading(false);
        if (shouldReplace) {
          return JSON.parse(data);
        }
        return prev?.length > 0
          ? [...prev, ...JSON.parse(data)]
          : JSON.parse(data);
      });
    });
  };

  const handleDelete = (key) => {
    setLoading(true);
    deleteAsset(key).then(() =>
      setAssets((prev) => {
        setLoading(false);
        return prev.filter((x) => x.public_id !== key);
      })
    );
  };

  return allowMultipleAssets ? (
    <div className={classes.galleryWrapper}>
      <UploadArea
        handleUpload={handleUpload}
        acceptedFileTypes={acceptedFileTypes}
      />
      {loading && <LinearProgress color="secondary" />}
      <AssetPreview
        classes={classes}
        loading={loading}
        assets={assets}
        handleDelete={handleDelete}
      />
    </div>
  ) : (
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
        <SingleAssetUpload
          url={url}
          handleUpload={handleUpload}
          acceptedFileTypes={acceptedFileTypes}
        />
        <AssetPreview
          classes={classes}
          loading={loading}
          assets={assets}
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

AssetContainer.propTypes = {
  url: PropTypes.string,
  allowMultipleAssets: PropTypes.bool,
  acceptedFileTypes: PropTypes.string,
};

export default AssetContainer;

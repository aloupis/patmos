import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import { uploadAssets, listAssets, deleteAsset } from '../../../services/asset';
import UploadArea from './UploadArea';
import GalleryStyles from '../common/styles';
import AssetsPreview from './AssetsPreview';

const useStyles = makeStyles(GalleryStyles);

const GalleryContainer = ({ url, acceptedFileTypes }) => {
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

  const handleUpload = (files) => {
    setLoading(true);
    uploadAssets(files, url).then(({ data }) => {
      setAssets((prev) => {
        setLoading(false);
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

  return (
    <div className={classes.galleryWrapper}>
      <UploadArea
        handleUpload={handleUpload}
        acceptedFileTypes={acceptedFileTypes}
      />
      {loading && <LinearProgress color="secondary" />}
      <AssetsPreview
        classes={classes}
        loading={loading}
        assets={assets}
        handleDelete={handleDelete}
      />
    </div>
  );
};

GalleryContainer.propTypes = {
  url: PropTypes.string,
  acceptedFileTypes: PropTypes.string,
};

export default GalleryContainer;

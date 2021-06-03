import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import { uploadAssets, listAssets, deleteAsset } from '../../services/asset';
import UploadArea from './UploadArea';
import GalleryStyles from './styles';
import Asset from './Asset';

const useStyles = makeStyles(GalleryStyles);

const AssetContainer = ({ url, allowMultipleAssets, acceptedFileTypes }) => {
  const classes = useStyles();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      listAssets(url).then(({ data }) => {
        const assets = JSON.parse(data);
        setMedia(assets);
        setLoading(false);
      }),
    [url]
  );

  const handleUpload = (files) => {
    setLoading(true);
    uploadAssets(files, url).then(({ data }) => {
      const assets = JSON.parse(data);
      setMedia((prev) => {
        setLoading(false);
        return prev?.length > 0 ? [...prev, ...assets] : assets;
      });
    });
  };

  const handleDelete = (key) => {
    setLoading(true);
    deleteAsset(key).then(() =>
      setMedia((prev) => {
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
      {media && (
        <div
          className={
            loading ? classes.loadingGalleryContainer : classes.galleryContainer
          }
        >
          {media
            .filter((x) => x.resource_type === 'image')
            .map((x) => (
              <Asset key={x.public_id} asset={x} onDelete={handleDelete} />
            ))}
        </div>
      )}
    </div>
  );
};

AssetContainer.propTypes = {
  url: PropTypes.string,
  allowMultipleAssets: PropTypes.bool,
  acceptedFileTypes: PropTypes.string,
};

export default AssetContainer;

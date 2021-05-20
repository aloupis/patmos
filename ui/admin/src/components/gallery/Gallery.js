import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import { uploadAssets, listAssets } from '../../services/asset';
import GalleryUploadArea from './GalleryUploadArea';
import GalleryStyles from './styles';
import PageWrapper from '../../common/PageWrapper';

const useStyles = makeStyles(GalleryStyles);

const Gallery = () => {
  const classes = useStyles();

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      listAssets('gallery/images').then(({ data }) => {
        const assets = JSON.parse(data);
        setMedia(assets);
        setLoading(false);
      }),
    []
  );

  const handleUpload = (files) => {
    setLoading(true);
    uploadAssets(files, 'gallery/images').then(({ data }) => {
      const assets = JSON.parse(data);
      setMedia((prev) => {
        setLoading(false);
        return prev?.length > 0 ? [...prev, ...assets] : assets;
      });
    });
  };

  return (
    <PageWrapper title="Gallery">
      <div className={classes.galleryWrapper}>
        <GalleryUploadArea handleUpload={handleUpload} />
        {loading && <LinearProgress color="secondary" />}
        <div
          className={
            loading ? classes.loadingGalleryContainer : classes.galleryContainer
          }
        >
          {media &&
            media
              .filter((x) => x.resource_type === 'image')
              .map((x) => (
                <img
                  key={x.public_id}
                  style={{ marginRight: '10px', maxHeight: '200px' }}
                  alt={x.public_id}
                  src={x.url}
                />
              ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Gallery;

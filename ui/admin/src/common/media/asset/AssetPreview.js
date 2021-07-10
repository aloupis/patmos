import React from 'react';
import PropTypes from 'prop-types';

const AssetPreview = ({ classes, loading, asset, handleDelete }) => {
  const { public_id: publicId, url } = asset;
  return (
    asset && (
      <div
        className={
          loading ? classes.loadingGalleryContainer : classes.galleryContainer
        }
      >
        <div className={classes.imageArea} key={publicId}>
          <img className={classes.imageAreaImg} src={url} alt={publicId} />
          <a
            className={classes.removeImage}
            style={{ display: 'inline' }}
            onKeyDown={() => handleDelete(publicId)}
            role="button"
            tabIndex={0}
            onClick={() => handleDelete(publicId)}
          >
            x
          </a>
        </div>
      </div>
    )
  );
};

AssetPreview.propTypes = {
  classes: PropTypes.object,
  asset: PropTypes.object,
  loading: PropTypes.bool,
  handleDelete: PropTypes.func,
};

export default AssetPreview;

import React from 'react';
import PropTypes from 'prop-types';

const AssetsPreview = ({ classes, loading, assets, handleDelete }) =>
  assets ? (
    <div
      className={
        loading ? classes.loadingGalleryContainer : classes.galleryContainer
      }
    >
      {assets.map(({ public_id, url }) => (
        <div className={classes.imageArea} key={public_id}>
          <img className={classes.imageAreaImg} src={url} alt={public_id} />
          <a
            className={classes.removeImage}
            style={{ display: 'inline' }}
            onKeyDown={() => handleDelete(public_id)}
            role="button"
            tabIndex={0}
            onClick={() => handleDelete(public_id)}
          >
            x
          </a>
        </div>
      ))}
    </div>
  ) : null;

AssetsPreview.propTypes = {
  classes: PropTypes.object,
  assets: PropTypes.array,
  loading: PropTypes.bool,
  handleDelete: PropTypes.func,
};

export default AssetsPreview;

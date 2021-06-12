import React from 'react';
import PropTypes from 'prop-types';

const SingleAssetPreview = ({ classes, loading, assets, handleDelete }) =>
  assets ? (
    <div
      className={
        loading
          ? classes.loadingAssetPreviewContainer
          : classes.assetPreviewContainer
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

SingleAssetPreview.propTypes = {
  classes: PropTypes.object,
  assets: PropTypes.array,
  loading: PropTypes.bool,
  handleDelete: PropTypes.func,
};

export default SingleAssetPreview;

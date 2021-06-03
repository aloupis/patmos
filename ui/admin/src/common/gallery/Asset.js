import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import GalleryStyles from './styles';

const useStyles = makeStyles(GalleryStyles);

const Asset = ({ asset, onDelete }) => {
  const classes = useStyles();

  const { public_id, url } = asset;
  return (
    <div className={classes.imageArea}>
      <img className={classes.imageAreaImg} src={url} alt={public_id} />
      <a
        className={classes.removeImage}
        style={{ display: 'inline' }}
        onKeyDown={() => onDelete(public_id)}
        role="button"
        tabIndex={0}
        onClick={() => onDelete(public_id)}
      >
        x
      </a>
    </div>
  );
};

Asset.propTypes = {
  asset: PropTypes.object,
  onDelete: PropTypes.func,
};

export default Asset;

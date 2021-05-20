import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import TouchAppIcon from '@material-ui/icons/TouchAppOutlined';
import { makeStyles } from '@material-ui/core';
import GalleryStyles from './styles';

const useStyles = makeStyles(GalleryStyles);

const GalleryUploadArea = ({ handleUpload }) => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles) => handleUpload(acceptedFiles),
    [handleUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: settings.acceptedFileTypes || undefined,
  });

  return (
    <div className={classes.dropArea} {...getRootProps()}>
      <input {...getInputProps()} />
      <div>
        <div className={classes.dropAreaMessage}>
          <TouchAppIcon classes={{ root: classes.touch }} />
        </div>
        <div>Drop files here or click to upload.</div>
      </div>
    </div>
  );
};

GalleryUploadArea.propTypes = {
  handleUpload: PropTypes.func,
};

export default GalleryUploadArea;

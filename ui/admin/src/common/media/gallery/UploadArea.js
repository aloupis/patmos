import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import TouchAppIcon from '@material-ui/icons/TouchAppOutlined';
import { makeStyles } from '@material-ui/core';
import GalleryStyles from '../common/styles';

const useStyles = makeStyles(GalleryStyles);

const UploadArea = ({ handleUpload, acceptedFileTypes }) => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles) => handleUpload(acceptedFiles),
    [handleUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes || undefined,
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

UploadArea.propTypes = {
  handleUpload: PropTypes.func,
  acceptedFileTypes: PropTypes.string,
};

export default UploadArea;

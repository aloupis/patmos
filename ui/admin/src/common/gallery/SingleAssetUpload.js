import React from 'react';
import PropTypes from 'prop-types';
import { deleteAsset } from '../../services/asset';

const SingleAssetUpload = ({ url, handleUpload, acceptedFileTypes }) => (
  <input
    id="file"
    type="file"
    onChange={(evt) =>
      deleteAsset(url).then(() =>
        handleUpload(Array.from(evt.target.files), { shouldReplace: true })
      )
    }
    accept={acceptedFileTypes}
  />
);
SingleAssetUpload.propTypes = {
  url: PropTypes.string,
  handleUpload: PropTypes.func,
  acceptedFileTypes: PropTypes.string,
};

export default SingleAssetUpload;

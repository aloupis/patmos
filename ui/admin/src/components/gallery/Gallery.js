import React from 'react';
import AssetContainer from '../../common/gallery/AssetContainer';
import PageWrapper from '../../common/PageWrapper';

const Gallery = () => (
  <PageWrapper title="Gallery">
    <AssetContainer
      url="gallery/images"
      allowMultipleAssets
      acceptedFileTypes="image/jpeg,image/png,image/gif"
    />
  </PageWrapper>
);

export default Gallery;

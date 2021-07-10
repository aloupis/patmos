import React from 'react';
import GalleryContainer from '../../common/media/gallery/GalleryContainer';
import PageWrapper from '../../common/PageWrapper';

const Gallery = () => (
  <PageWrapper title="Gallery">
    <GalleryContainer
      url="gallery/images"
      allowMultipleAssets
      acceptedFileTypes="image/jpeg,image/png,image/gif"
    />
  </PageWrapper>
);

export default Gallery;

import axios from 'axios';

const url = 'https://patmos-media.herokuapp.com/'; // http://localhost:3050/media';

export const listAssets = (path) => {
  const formData = new FormData();
  formData.append('folder', path);
  return axios({
    url: `${url}/files`,
    method: 'post',
    data: formData,
  });
};

export const uploadAssets = (files, path) => {
  const formData = new FormData();
  files.forEach((x) => formData.append('files', x, x.name));
  formData.append('path', path);

  return axios({
    url: `${url}/upload`,
    method: 'put',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteAsset = async (publicId) => {
  const formData = new FormData();
  formData.append('key', publicId);
  return axios({
    url: `${url}/delete`,
    method: 'post',
    data: formData,
  });
};

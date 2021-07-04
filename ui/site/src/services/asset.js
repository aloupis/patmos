import axios from 'axios';

const url =
  process.env.REACT_APP_MEDIA || 'https://patmos-nginx.herokuapp.com/media';

export const listAssets = (path) => {
  const formData = new FormData();
  formData.append('folder', path);
  return axios({
    url: `${url}/files`,
    method: 'post',
    data: formData,
  });
};

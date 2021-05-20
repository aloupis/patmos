import { grey } from '@material-ui/core/colors';

export default (theme) => ({
  touch: {
    height: '2em',
    width: '2em',
  },
  dropArea: {
    height: '250px',
    backgroundColor: `${grey[200]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  dropAreaMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  galleryWrapper: {
    margin: theme.spacing(2, 0),
  },
  galleryContainer: {
    border: '1px dashed #eee',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },
  loadingGalleryContainer: {
    border: '1px dashed #eee',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    opacity: '0.5',
  },
});

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
    border: '1px dashed #555',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },
  loadingGalleryContainer: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
    opacity: '0.5',
  },

  imageArea: {
    position: 'relative',
    width: '50%',
    display: 'inline',
  },
  imageAreaImg: {
    maxWidth: '100%',
    height: 'auto',
    marginRight: '20px',
    marginBottom: '20px',
    maxHeight: '200px',
  },
  removeImage: {
    cursor: 'pointer',
    display: 'none',
    position: 'absolute',
    right: '10px',
    borderRadius: '10em',
    padding: '2px 6px 3px',
    textDecoration: 'none',
    font: '700 21px/20px sans-serif',
    background: '#555',
    border: '3px solid #fff',
    color: '#FFF',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3)',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
    '-webkit-transition': 'background 0.5s',
    transition: 'background 0.5s',
  },
  'removeImage:hover': {
    background: '#E54E4E',
    padding: '3px 7px 5px',
    top: '-11px',
    right: '-11px',
  },
  'removeImage:active': {
    background: '#E54E4E',
    top: '-10px',
    right: '-11px',
  },
});

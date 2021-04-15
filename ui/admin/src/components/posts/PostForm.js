import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ActionFormButtons } from '../../common/ActionFormButtons';
import { CancelBtn } from '../../common/CancelBtn';
import useForm from '../../useForm';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = React.lazy(() => import('react-quill'));

const useStyles = makeStyles((theme) => ({
  quill: {
    marginTop: theme.spacing(1),
    height: '200px',
  },
}));

const formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'align',
  'color',
  'background',
  'image',
  'link',
  'video',
  'mention',
];

const PostForm = ({ post, onSave, onError, history }) => {
  const classes = useStyles();

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'], // add's image support
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ],
    }),

    [] // TODO: fix eslint error somehow
  );

  const { values, handleChange, handleBaseChange } = useForm({
    initialValues: post
      ? {
          title_en: post.title_en,
          title_gr: post.title_gr,
          content_en: post.content_en,
          content_gr: post.content_gr,
        }
      : {
          title_en: '',
          title_gr: '',
          content_en: '',
          content_gr: '',
        },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6">English</Typography>
          </div>

          <TextField
            id="title_en"
            name="title_en"
            label="Title"
            variant="outlined"
            onChange={handleChange}
            required
            fullWidth
            value={values.title_en || ''}
          />

          <div>
            <ReactQuill
              id="content_en"
              name="content_en"
              theme="snow"
              className={classes.quill}
              modules={modules}
              formats={formats}
              onChange={(value) => handleBaseChange('content_en', value)}
              value={values.content_en || ''}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6">Greek</Typography>
          </div>

          <TextField
            id="title_gr"
            name="title_gr"
            label="Title"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            required
            value={values.title_gr || ''}
          />

          <div>
            <ReactQuill
              id="content_gr"
              name="content_gr"
              theme="snow"
              className={classes.quill}
              modules={modules}
              formats={formats}
              onChange={(value) => handleBaseChange('content_gr', value)}
              value={values.content_gr || ''}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ marginTop: '100px' }}>
        <Divider />
        <ActionFormButtons>
          <Box flexGrow={1} />
          <Box>
            <CancelBtn onClick={() => history.push(`/posts`)}>Cancel</CancelBtn>
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </ActionFormButtons>
      </div>
    </form>
  );
};

PostForm.propTypes = {
  post: PropTypes.object,
  onSave: PropTypes.func,
  onError: PropTypes.func,
  history: PropTypes.any,
};

export default PostForm;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useForm from '../../useForm';
import { CancelBtn } from '../../common/CancelBtn';
import { ActionFormButtons } from '../../common/ActionFormButtons';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = React.lazy(() => import('react-quill'));

const useStyles = makeStyles((theme) => ({
  quill: {
    height: '200px',
  },
  control: { marginBottom: theme.spacing(2) },
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

const SettingsForm = ({ settings, onSave, onError, history }) => {
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
    initialValues: settings
      ? {
          about_us_title_gr: settings.about_us_title_gr,
          about_us_title_en: settings.about_us_title_en,
          about_us_content_gr: settings.about_us_content_gr,
          about_us_content_en: settings.about_us_content_en,
        }
      : {
          about_us_title_gr: '',
          about_us_title_en: '',
          about_us_content_gr: '',
          about_us_content_en: '',
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
            id="about_us_title_en"
            name="about_us_title_en"
            label="About Us Title"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            required
            fullWidth
            value={values.about_us_title_en || ''}
          />

          <div>
            <ReactQuill
              id="about_us_content_en"
              name="about_us_content_en"
              theme="snow"
              className={classes.quill}
              modules={modules}
              formats={formats}
              onChange={(value) =>
                handleBaseChange('about_us_content_en', value)
              }
              value={values.about_us_content_en || ''}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginBottom: '15px' }}>
            <Typography variant="h6">Greek</Typography>
          </div>
          <TextField
            id="about_us_title_gr"
            name="about_us_title_gr"
            label="About Us Title"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            required
            value={values.about_us_title_gr || ''}
          />
          <div>
            <ReactQuill
              id="about_us_content_gr"
              name="about_us_content_gr"
              theme="snow"
              className={classes.quill}
              modules={modules}
              formats={formats}
              onChange={(value) =>
                handleBaseChange('about_us_content_gr', value)
              }
              value={values.about_us_content_gr || ''}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ marginTop: '50px' }}>
        <Divider />
        <ActionFormButtons>
          <Box flexGrow={1} />
          <Box>
            <CancelBtn onClick={() => history.push(`/`)}>Cancel</CancelBtn>
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </ActionFormButtons>
      </div>
    </form>
  );
};

SettingsForm.propTypes = {
  settings: PropTypes.object,
  onSave: PropTypes.func,
  onError: PropTypes.func,
  history: PropTypes.any,
};

export default SettingsForm;

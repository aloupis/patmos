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
import SelectCategory from '../categories/SelectCategory';

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

const ServiceForm = ({ service, onSave, onError, history }) => {
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
    initialValues: service
      ? {
          name_en: service.name_en,
          name_gr: service.name_gr,
          content_en: service.content_en,
          content_gr: service.content_gr,
          category_id: service.category.id,
          price: service.price,
          summary_en: service.summary_en,
          summary_gr: service.summary_gr,
        }
      : {
          name_en: '',
          name_gr: '',
          content_en: '',
          content_gr: '',
          category_id: 0,
          price: 0,
          summary_en: '',
          summary_gr: '',
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
            id="name_en"
            name="name_en"
            label="Name"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            required
            fullWidth
            value={values.name_en || ''}
          />
          <TextField
            id="summary_en"
            name="summary_en"
            label="Summary"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            value={values.summary_en || ''}
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
            id="name_gr"
            name="name_gr"
            label="Name"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            required
            value={values.name_gr || ''}
          />
          <TextField
            id="summary_gr"
            name="summary_gr"
            label="Summary"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            value={values.summary_gr || ''}
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
      <Grid container spacing={3} style={{ marginTop: '50px' }}>
        <Grid item xs={12}>
          <Typography variant="h6">Basic Info</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="price"
            name="price"
            label="Price (€)"
            variant="outlined"
            type="number"
            onChange={handleChange}
            required
            fullWidth
            value={values.price || ''}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectCategory
            handleChange={handleChange}
            category_id={values.category_id || ''}
          />
        </Grid>
      </Grid>

      <div style={{ marginTop: '50px' }}>
        <Divider />
        <ActionFormButtons>
          <Box flexGrow={1} />
          <Box>
            <CancelBtn onClick={() => history.push(`/services`)}>
              Cancel
            </CancelBtn>
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </ActionFormButtons>
      </div>
    </form>
  );
};

ServiceForm.propTypes = {
  service: PropTypes.object,
  onSave: PropTypes.func,
  onError: PropTypes.func,
  history: PropTypes.any,
};

export default ServiceForm;

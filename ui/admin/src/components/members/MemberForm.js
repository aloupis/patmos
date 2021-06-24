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

const MemberForm = ({ member, onSave, onError, history }) => {
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
    initialValues: member
      ? {
          name_en: member.name_en,
          name_gr: member.name_gr,
          description_en: member.description_en,
          description_gr: member.description_gr,
          summary_en: member.summary_en,
          summary_gr: member.summary_gr,
          position_en: member.position_en,
          position_gr: member.position_gr,
        }
      : {
          name_en: '',
          name_gr: '',
          description_en: '',
          description_gr: '',
          summary_en: '',
          summary_gr: '',
          position_en: '',
          position_gr: '',
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
            label="name"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            required
            fullWidth
            value={values.name_en || ''}
          />
          <TextField
            id="position_en"
            name="position_en"
            label="Position"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            value={values.position_en || ''}
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
              id="description_en"
              name="description_en"
              theme="snow"
              className={classes.quill}
              modules={modules}
              formats={formats}
              onChange={(value) => handleBaseChange('description_en', value)}
              value={values.description_en || ''}
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
            label="name"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            required
            value={values.name_gr || ''}
          />
          <TextField
            id="position_gr"
            name="position_gr"
            label="Position"
            variant="outlined"
            className={classes.control}
            onChange={handleChange}
            fullWidth
            value={values.position_en || ''}
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
              id="description_gr"
              name="description_gr"
              theme="snow"
              className={classes.quill}
              modules={modules}
              formats={formats}
              onChange={(value) => handleBaseChange('description_gr', value)}
              value={values.description_gr || ''}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ marginTop: '100px' }}>
        <Divider />
        <ActionFormButtons>
          <Box flexGrow={1} />
          <Box>
            <CancelBtn onClick={() => history.push(`/members`)}>
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

MemberForm.propTypes = {
  member: PropTypes.object,
  onSave: PropTypes.func,
  onError: PropTypes.func,
  history: PropTypes.any,
};

export default MemberForm;

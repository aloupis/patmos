import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { useQuery } from '@apollo/client';

import { CATEGORIES_QUERY } from './model';

const SelectCategory = ({ handleChange, category_id }) => {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY, {
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  if (loading) return <div>loading</div>;
  return (
    <TextField
      id="category_id"
      name="category_id"
      label="Category"
      variant="outlined"
      select
      onChange={handleChange}
      required
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      SelectProps={{
        native: true,
      }}
      value={category_id}
    >
      <option value=""> </option>
      {data.categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name_en}
        </option>
      ))}
    </TextField>
  );
};

SelectCategory.propTypes = {
  handleChange: PropTypes.func,
  category_id: PropTypes.number,
};

export default SelectCategory;

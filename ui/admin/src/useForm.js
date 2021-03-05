import { useState } from 'react';

export default function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues || {});

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBaseChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    handleChange,
    handleBaseChange,
    values,
  };
}

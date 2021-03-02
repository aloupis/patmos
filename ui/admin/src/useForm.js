import { useState } from 'react';

export default function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues || {});

  const handleChange = (event) => {
    console.log({ event });
    const { value } = event.target;
    const { name } = event.target;
    console.log({ value, name });
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

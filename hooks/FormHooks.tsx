import {useState } from 'react';

const useFormHandler = (initialValues: any) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    setFormData({
        ...formData,
        image: file || null,
    });
};

  return {
    formData,
    handleChange,
    handleDropdownChange,
    setFormData,
    handleImageChange
  };
};

export default useFormHandler;

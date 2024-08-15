
import { useState } from 'react';
import { InputFieldProps } from '@/interface/formfield';

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

  const handleSubmit = (callback: (data: any) => void) => (e: any) => {
    e.preventDefault();
    callback(formData);
  };

  return {
    formData,
    handleChange,
    handleDropdownChange,
    setFormData,
    handleImageChange,
    handleSubmit,
  };
};

export default useFormHandler;

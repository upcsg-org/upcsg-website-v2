
import { useState } from 'react';

const useFormHandler = (initialValues: any) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: any) => {
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
    setFormData,
    handleImageChange,
    handleSubmit,
  };
};

export default useFormHandler;

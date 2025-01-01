import { useState, FormEvent, ChangeEvent } from 'react';
import { ActivityFormData } from '../types/activity';
import { activityTypes, activityColors } from '../utils/constants';

const DEFAULT_FORM_STATE: ActivityFormData = {
  type: '',
  duration: 30,
  intensity: 'Sedang'
};

export function useActivityForm(onSubmit: (data: ActivityFormData) => void) {
  const [formData, setFormData] = useState<ActivityFormData>(DEFAULT_FORM_STATE);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.duration > 0) {
      onSubmit(formData);
      setFormData(DEFAULT_FORM_STATE);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? Math.max(1, parseInt(value) || 0) : value
    }));
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
}
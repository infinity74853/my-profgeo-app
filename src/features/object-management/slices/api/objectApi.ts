import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/shared/api/Api';

export const submitObjectForm = createAsyncThunk(
  'objectForm/submit',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/objects', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при сохранении');
    }
  }
);
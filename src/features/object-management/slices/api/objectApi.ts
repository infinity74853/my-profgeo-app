import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TableItem, ObjectFormData } from '@/features/object-management/model/types';

export const saveObject = createAsyncThunk<TableItem, Partial<TableItem>, { rejectValue: string }>(
  'object/save',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post<TableItem>('/objects', data);
      return response.data;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || 'Ошибка при сохранении');
    }
  }
);

export const importObjects = createAsyncThunk<TableItem[], FormData, { rejectValue: string }>(
  'object/import',
  async (file, { rejectWithValue }) => {
    try {
      const response = await axios.post<TableItem[]>('/objects/import', file, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || 'Ошибка при импорте данных');
    }
  }
);

// ✅ Добавляем недостающий submitObjectForm
export const submitObjectForm = createAsyncThunk<TableItem, ObjectFormData, { rejectValue: string }>(
  'object/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post<TableItem>('/objects', formData);
      return response.data;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || 'Ошибка при отправке формы');
    }
  }
);

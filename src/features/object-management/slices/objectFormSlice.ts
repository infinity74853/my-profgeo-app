import { createSlice } from '@reduxjs/toolkit';
import { submitObjectForm } from './api/objectApi';

interface ObjectFormState {
  showObjectForm: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ObjectFormState = {
  showObjectForm: false,
  isLoading: false,
  error: null
};

export const objectFormSlice = createSlice({
  name: 'objectForm',
  initialState,
  reducers: {
    showCreateForm: (state) => {
      state.showObjectForm = true;
    },
    hideCreateForm: (state) => {
      state.showObjectForm = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitObjectForm.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitObjectForm.fulfilled, (state) => {
        state.isLoading = false;
        state.showObjectForm = false;
      })
      .addCase(submitObjectForm.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка сохранения';
      });
  }
});

export const { showCreateForm, hideCreateForm } = objectFormSlice.actions;
export default objectFormSlice.reducer;
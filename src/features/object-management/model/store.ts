import { createStore, createEvent, createEffect, sample } from 'effector';
import { api } from '@/shared/api/Api';
import type { ObjectFormData, TableItem } from './types';

// ===== События =====
export const formSubmitted = createEvent<ObjectFormData>();
export const tableRowAdded = createEvent<Partial<TableItem>>();
export const tableRowUpdated = createEvent<{ id: string; data: Partial<TableItem> }>();
export const tablePageChanged = createEvent<number>();

// ===== Эффекты =====
export const submitFormFx = createEffect<ObjectFormData, TableItem>(async (formData) => {
  // Здесь вызываем метод API, который создаёт объект
  return await api.createObject<TableItem>(formData);
});

export const importTableDataFx = createEffect<FormData, TableItem[]>(async (file) => {
  return await api.importTableData<TableItem[]>(file);
});

// ===== Сторы =====
export const $objectForm = createStore<ObjectFormData>({
  id: '',
  name: '',
  description: '',
  createdAt: ''
});

export const $tableData = createStore<TableItem[]>([])
  .on(submitFormFx.doneData, (state, newItem): TableItem[] => {
    const index = state.findIndex((item) => item.id === newItem.id);
    if (index >= 0) {
      const updated = [...state];
      updated[index] = newItem;
      return updated;
    }
    return [...state, newItem];
  });

export const $currentPage = createStore(1);
export const $totalPages = createStore(1);

// ===== Логика =====
sample({
  clock: formSubmitted,
  target: submitFormFx
});


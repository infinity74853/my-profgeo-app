import { createStore, createEvent, sample } from 'effector';
import { api } from '@/shared/api/Api';
import type { ObjectFormData, TableItem } from './types';

// События
export const formSubmitted = createEvent<ObjectFormData>();
export const tableRowAdded = createEvent<Partial<TableItem>>();
export const tableRowUpdated = createEvent<{id: string; data: Partial<TableItem>}>();
export const tablePageChanged = createEvent<number>();

// Сторы
export const $objectForm = createStore<ObjectFormData>({...});
export const $tableData = createStore<TableItem[]>([]);
export const $currentPage = createStore(1);
export const $totalPages = createStore(1);

// Эффекты
const submitFormFx = createEffect(async (formData: ObjectFormData) => {
  return await api.createObject(formData);
});

// Логика
sample({
  clock: formSubmitted,
  target: submitFormFx
});

export const importTableDataFx = createEffect(async (file: FormData) => {
  const response = await api.importTableData(file);
  return response.data;
});
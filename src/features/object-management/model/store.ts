import { createEffect, createEvent, createStore } from 'effector';

// ===== Типы =====
export type ObjectItem = {
  id: string;
  name: string;
  code: string;
  contractNumber?: string;
  contractDate?: string;
  designation?: string;
  customer?: string;
  contractor?: string;
};

// payload от формы (без id)
export type CreateObjectPayload = {
  name: string;
  code: string;
  contractNumber?: string;
  contractDate?: string;
  designation?: string;
  customer?: string;
  contractor?: string;
};

// ===== Эвенты =====
export const addObject = createEvent<ObjectItem>();
export const removeObject = createEvent<string>();
export const setPage = createEvent<number>();

// ===== Эффекты =====
// форма отправляет payload без id, эффект сам его проставляет
export const submitFormFx = createEffect<CreateObjectPayload, ObjectItem>(async (data) => {
  await new Promise((res) => setTimeout(res, 300));
  return {
    id: Date.now().toString(),
    ...data,
  };
});

// Делаем импорт гибким: можно передать File (вернёт заглушки) или массив объектов
export const importTableDataFx = createEffect<File | Partial<ObjectItem>[], ObjectItem[]>(async (input) => {
  await new Promise((res) => setTimeout(res, 300));

  if (Array.isArray(input)) {
    return input.map((row, idx) => ({
      id: row.id ?? (Date.now() + idx).toString(),
      name: row.name ?? '',
      code: row.code ?? '',
      contractNumber: row.contractNumber,
      contractDate: row.contractDate,
      designation: row.designation,
      customer: row.customer,
      contractor: row.contractor,
    }));
  }

  // Если передали File — вернём заглушки
  return [
    { id: '1', name: 'Импорт 1', code: 'IMP001' },
    { id: '2', name: 'Импорт 2', code: 'IMP002' },
  ];
});

// ===== Состояние =====
export const $objects = createStore<ObjectItem[]>([])
  .on(addObject, (state, obj) => [...state, obj])
  .on(removeObject, (state, id) => state.filter((o) => o.id !== id))
  .on(importTableDataFx.doneData, (state, imported) => [...state, ...imported])
  .on(submitFormFx.doneData, (state, obj) => [...state, obj]);

export const $page = createStore<number>(1).on(setPage, (_, page) => page);

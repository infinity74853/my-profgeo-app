// Данные формы создания/редактирования объекта
export interface ObjectFormData {
  id?: string;
  name: string;
  description?: string;
  createdAt?: string;
}

// Данные строки в таблице
export interface TableItem {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}
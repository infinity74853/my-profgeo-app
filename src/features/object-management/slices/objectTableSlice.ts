import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableItem {
  id: string;
  name: string;
  type: string;
  routeDefined: boolean;
  profileDefined: boolean;
  scale: string;
}

interface ObjectTableState {
  data: TableItem[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

const initialState: ObjectTableState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false
};

export const objectTableSlice = createSlice({
  name: 'objectTable',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<TableItem[]>) => {
      state.data = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export const { setTableData, setPage } = objectTableSlice.actions;
export default objectTableSlice.reducer;
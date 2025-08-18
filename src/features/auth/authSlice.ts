import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { name: string; email: string };

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

// Загружаем пользователя из localStorage (если есть)
const savedUser = localStorage.getItem("user");
const initialState: AuthState = savedUser
  ? { isAuthenticated: true, user: JSON.parse(savedUser) }
  : { isAuthenticated: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;

      // тестовая учётка
      if (email === "exsample@mail.ru" && password === "password") {
        state.isAuthenticated = true;
        state.user = { name: "Иван Петров", email };

        // сохраняем в localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
      } else {
        alert("Неверные данные. Используйте e-mail: exsample@mail.ru, пароль: password");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      // очищаем localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@widgets/Header/Header";
import TitleContainer from "@widgets/TitleContainer/TitleContainer";
import HomeLayout from "@pages/Home/HomeLayout";

import Home from "@pages/Home/Home";
import ObjectsList from "@pages/Objects/ObjectsList";
import CreateObject from "@pages/Objects/CreateObject";
import Account from "@pages/Account/Account";
import Subscription from "@pages/Subscription/Subscription";
import Users from "@pages/Users/Users";
import Settings from "@pages/Settings/Settings";

import Welcome from "@pages/Welcome/Welcome";
import Login from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";

import ProtectedRoute from "@app/providers/ProtectedRoute"; // ✅ вынесено отдельно

import "@app/styles/index.css";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Шапка */}
      <Header />

      {/* Заголовок страницы */}
      <TitleContainer />

      {/* Основной контент */}
      <Routes>
        {/* Открытые маршруты */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Защищённые маршруты */}
        <Route
          path="/lk"
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="objects" element={<ObjectsList />} />
          <Route path="objects/create" element={<CreateObject />} />
          <Route path="account" element={<Account />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/work"
          element={
            <ProtectedRoute>
              {/* Временно пустая страница */}
              <div style={{ padding: 40 }} />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена</div>} />
      </Routes>

      {/* Уведомления */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default App;

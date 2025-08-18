import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@widgets/Header/Header";
import TitleContainer from "@widgets/TitleContainer/TitleContainer";
import HomeLayout from "@pages/Home/HomeLayout";
import WorkLayout from "@widgets/Work/WorkLayout";
import WorkHome from "@pages/Work/WorkHome";

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

import ProtectedRoute from "@app/providers/ProtectedRoute";

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
        {/* Личный кабинет */}
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
        
        {/* Рабочий кабинет */}
        <Route
          path="/work"
          element={
            <ProtectedRoute>
              <WorkLayout />
            </ProtectedRoute>
          }
        >
        <Route index element={<WorkHome />} />
          <Route path="app1" element={<div>Приложение 1</div>} />
          <Route path="app2" element={<div>Приложение 2</div>} />
          <Route path="app3" element={<div>Приложение 3</div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>Страница не найдена</div>} />
      </Routes>

      {/* Уведомления */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default App;

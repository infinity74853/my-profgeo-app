import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/widgets/Layout/Layout';
import ObjectsPage from '@/pages/Objects/ObjectsPage';
import CreateObjectPage from '@/pages/CreateObject/CreateObjectPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/objects" replace />} />
        <Route path="/objects" element={<ObjectsPage />} />
        <Route path="/objects/create" element={<CreateObjectPage />} />
        {/* заглушки под остальные пункты меню */}
        <Route path="/account" element={<div style={{padding:24}}>Аккаунт</div>} />
        <Route path="/subscription" element={<div style={{padding:24}}>Подписка</div>} />
        <Route path="/users" element={<div style={{padding:24}}>Список пользователей</div>} />
        <Route path="/settings" element={<div style={{padding:24}}>Настройки</div>} />
      </Route>
    </Routes>
  );
};

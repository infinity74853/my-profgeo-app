import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { login } from "@/features/auth/model/authSlice";

import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";

import styles from "./Register.module.css";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate("/lk"); // после входа — личный кабинет
  };

  return (
    <div className={styles.page}>      
        {/* Левая часть — колонка */}
        <div className={styles.left}>
          <div className={styles.backRow}>
          <Button className={styles.backBtn} onClick={() => navigate(-1)}>←-</Button>
        </div>

        {/* Брендинг и заголовок */}
        <div className={styles.brandBlock}>
          <div className={styles.logoRow}>
            <div
              className={styles.logoDot}
              
            />
            <div className={styles.logoText}>Profdepo</div>
          </div>

          <h1 className={styles.title}>Вход</h1>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <Label htmlFor="email">почта или телефон</Label>
              <Input
                id="email"
                type="email"
                placeholder="Введите e-mail"
                className={styles.inputAuth}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                className={styles.inputAuth}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className={styles.submit}>
              Войти
            </Button>
          </form>

          <p className={styles.switchText}>
            Впервые здесь? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>

        {/* Правая часть — картинка */}
        <div className={styles.imageSide}>
          <img src="src\app\assets\Image.png" alt="Вход" />
        </div>
      </div>    
  );
};

export default Login;


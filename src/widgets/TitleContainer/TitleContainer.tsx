import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./TitleContainer.module.css";

const TitleContainer: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  let title = "";

  if (!isAuthenticated) {
    title = 'Добро пожаловать на сайт Profgeo! Пожалуйста, зарегистрируйтесь или авторизуйтесь.';
  } else if (location.pathname.startsWith("/work")) {
    title = "Перечень графических приложений";
  } else {
    title = 'Страница пользователя';
  }

  return (
    <div className={styles["title-container"]}>
      <h1 className={styles["title-container__text"]}>{title}</h1>
    </div>
  );
};

export default TitleContainer;



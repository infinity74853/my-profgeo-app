import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Label } from "@/shared/ui/Label/Label";

import imageUrl from "@/app/assets/Image.png";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<"legal" | "individual">("legal");
  const [accepted, setAccepted] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [inn, setInn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const canSubmit =
    (userType === "individual" ? true : companyName.trim().length > 1) &&
    email.trim() &&
    phone.trim() &&
    accepted;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    // TODO: отправка формы/следующий шаг
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      {/* Левая часть - колонка */}
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

          <h1 className={styles.title}>Регистрация</h1>

          {/* Переключатель типа пользователя (две “пилюльки”) */}
          <div className={styles.segment}>
            <button
              type="button"
              className={`${styles.segmentItem} ${userType === "legal" ? styles.segmentItemActive : ""}`}
              onClick={() => setUserType("legal")}
            >
              Для юридических лиц
            </button>
            <button
              type="button"
              className={`${styles.segmentItem} ${userType === "individual" ? styles.segmentItemActive : ""}`}
              onClick={() => setUserType("individual")}
            >
              Для физических лиц
            </button>
          </div>
        </div>

        {/* Форма */}
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <Label htmlFor="company" className={styles.label}>Название компании</Label>
              <Input
                id="company"
                placeholder="Введите название компании"
                className={styles.inputAuth}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={userType === "individual"}
              />
            </div>

            <div className={styles.field}>
              <Label htmlFor="inn" className={styles.label}>ИНН</Label>
              <Input
                id="inn"
                placeholder="Введите ИНН"
                className={styles.inputAuth}
                value={inn}
                onChange={(e) => setInn(e.target.value)}
                disabled={userType === "individual"}
              />
            </div>
          </div>

          <div className={styles.field}>
            <Label htmlFor="email" className={styles.label}>Почта</Label>
            <Input
              id="email"
              type="email"
              placeholder="Введите почту"
              className={styles.inputAuth}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <Label htmlFor="phone" className={styles.label}>Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Введите телефон"
              className={styles.inputAuth}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={styles.checkboxRow}>
            <Checkbox
              checked={accepted}
              onCheckedChange={(v: boolean) => setAccepted(v)}
            />
            <Label className={styles.checkboxLabel}>
              Я принимаю условия{" "}
              <a
                className={styles.link}
                href="https://docs.google.com/document/d/1fo_T40LV_p1axxp1DCMYVrd-vbzQFvFmpmv-IPv-zos/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                Политики обработки персональных данных
              </a>
            </Label>
          </div>

          <Button className={styles.submit} disabled={!canSubmit}>
            Далее
          </Button>

          <div className={styles.haveAccount}>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </form>
      </div>

      {/* Правая колонка с изображением */}
      <div className={styles.right}>
        <div className={styles.screenshotCard}>
          <img src={imageUrl} alt="Preview" className={styles.screenshotImg} />
        </div>
      </div>
    </div>
  );
};

export default Register;



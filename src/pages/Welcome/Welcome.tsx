import "./Welcome.css"; // создадим css рядом

const Welcome = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 100px)" // минус шапка
    }}>
      <img
        src="/welcome-bg.jpg"
        alt="Добро пожаловать"
        style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
      />
    </div>
  );
};

export default Welcome;

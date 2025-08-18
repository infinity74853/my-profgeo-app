import "./Welcome.css";
import hero from "@app/assets/hero.png"; // кладём картинку в src/app/assets/

const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <img
        src={hero}
        alt="Добро пожаловать"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};

export default Welcome;

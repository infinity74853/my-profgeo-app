import "./Welcome.css";
import hero from "@app/assets/hero.png";

const Welcome = () => {
  return (
    <div
      className="welcome"
    >
      <img
        src={hero}
        alt="Добро пожаловать"
        className="welcome__image"
      />
    </div>
  );
};

export default Welcome;

import Card from "../../components/card/Card";
import stylus from "../../styles/fetchmovie.module.css";

const Fetchmovie = ({ stories = [] }) => {
  const cards = stories.map((result, index) => {
    return <Card key={index} resultos={result} />;
  });

  return (
    <div className="fullContainer">
      <div>
        <div className={stylus.cardsContainer}>{cards}</div>
      </div>
    </div>
  );
};

export default Fetchmovie;

import "./Card.css";

const Card = (props) => {
  console.log(props.card);

  return (
    <div className="Card">
      <img src={props.card.image} style={{ rotate: props.card.rotate+"deg" }} />
    </div>
  );
};

export default Card;

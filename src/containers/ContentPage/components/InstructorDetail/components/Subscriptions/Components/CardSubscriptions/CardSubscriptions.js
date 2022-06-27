import CardSubscriptionsWrapper from "./CardSubscriptionsStyle";
import Avatar from "components/Avatar/Avatar";

function CardSubscriptions({imgLink,name,description}) {
  return (
    <CardSubscriptionsWrapper>
      <Avatar
        style={{ width: "100px", height: "100px" }}
        imgLink={imgLink}
        fullName={name}
      />
      <h3>{name}</h3>
      <p>{description}</p>
    </CardSubscriptionsWrapper>
  );
}

export default CardSubscriptions;

import { Row, Col } from "antd";
import React from "react";
import SubscriptionsWrapper from "./SubscriptionsStyled";
import CardSubscriptionsWrapper from "./Components/CardSubscriptions/CardSubscriptions";

function Subscriptions({ userId,listSubscriptions }) {
  
  return (
    <SubscriptionsWrapper>
      <Row>
        {listSubscriptions.length===0&&(<span>No Subscriptions</span>)}
        {listSubscriptions?.map((item) => (
          <Col key={item.id} xs={24} sm={24} md={12} lg={8} xl={6}>
            <CardSubscriptionsWrapper
              imgLink={item.subscriber.image}
              name={item.subscriber.fullName}
              description={item.subscriber.introduction}
            />
          </Col>
        ))}
      </Row>
    </SubscriptionsWrapper>
  );
}

export default Subscriptions;

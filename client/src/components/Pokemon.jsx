import React from "react";
import { Card } from "antd";

const Pokemon = ({ name, url }) => {
  return (
    <li style={{ marginTop: 20, marginLeft: 20 }}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={url} width="50px" />}
      >
        <h2>{name}</h2>
      </Card>
    </li>
  );
};

export default Pokemon;

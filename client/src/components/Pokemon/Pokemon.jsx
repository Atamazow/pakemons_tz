import React, { memo } from "react";
import { Card } from "antd";
import styles from './Pokemon.module.css'

const Pokemon = ({ name, url }) => {
  return (
    <li className={styles.pokemon_item}>
      <Card
        hoverable
        className={styles.pokemon_card}
        cover={<img alt="example" src={url} width="50px" />}
      >
        <h2>{name}</h2>
      </Card>
    </li>
  );
};

export default memo(Pokemon);

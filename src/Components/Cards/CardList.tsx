import React, { ReactElement } from "react";
import { CardListProperties } from "./CardList.Properties";

export default function CardList(props: CardListProperties): ReactElement {
    const genCardList = (itemsNumber: number) => {
        return Array.from(Array(itemsNumber).keys()).map((val, i) =>
        <div key={i} className="i-card-item" style={{minWidth: props.containerWidth-2, border: 'solid 1px black'}}>Card {i+1}</div>);
    }

    return (
        <React.Fragment>
            {genCardList(props.itemsNumber)}
        </React.Fragment>
    );
}
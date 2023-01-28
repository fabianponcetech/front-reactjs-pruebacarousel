import React, { ReactElement } from "react";
import { CardListProperties } from "./CardList.Properties";

export default function CardList(props: CardListProperties): ReactElement {
    const genCardList = (itemsNumber: number) => {
        if (props.cardWidth > props.containerWidth) props.cardWidth = props.containerWidth;
        let cardItems: ReactElement[] = Array.from(Array(itemsNumber).keys()).map((val, i) =>
            <div key={i} className="i-card-item" style={{minWidth: props.cardWidth-2, border: 'solid 1px black'}}>{i+1}</div>);
        cardItems.unshift(<div key="last" className="i-card-item" style={{minWidth: props.cardWidth-2, border: 'solid 1px black'}}>{cardItems.length}</div>);
        cardItems.push(<div key="first" className="i-card-item" style={{minWidth: props.cardWidth-2, border: 'solid 1px black'}}>1</div>);
        return cardItems;
    }

    return (
        <React.Fragment>
            {genCardList(props.itemsNumber)}
        </React.Fragment>
    );
}
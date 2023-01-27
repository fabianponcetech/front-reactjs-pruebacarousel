import { ReactElement } from "react";
import { CardsV2Properties } from "./CardsV2.Properties";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";

export default function Cards(props: CardsV2Properties): ReactElement {

    return (
        <div className="i-cards-v2-component">
        <h1>{props.title}</h1>
        <p>{props.summary}</p>
        <div className="i-cards-v2-container" style={{width: props.containerWidth}}>
            EN DESARROLLO...
        </div>
        <div className="i-prev-next-buttons" style={{width: props.containerWidth}}>
            <div className="i-prev-button"><PrevCard/></div>
            <div className="i-next-button"><NextCard/></div>
        </div>
    </div>
    );
}
import { ReactElement, useEffect, useState } from "react";
import CardList from "./CardList";
import { CardsV2Properties } from "./CardsV2.Properties";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";

export default function Cards(props: CardsV2Properties): ReactElement {
    const [position, setPosition]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(1);
    const cardWidth: number = props.cardWidth;
    const nextHandler = (ele: HTMLDivElement): void => {
        const cardsContainer: HTMLDivElement | undefined | null = getCardContainer(ele);
        if (position === props.cardsNumber) {
            setScrollPosition(cardsContainer, 1);
            setPosition(1);
        }
        else {
            setScrollPosition(cardsContainer, position+1);
            setPosition(position+1);
        }
    }
    const prevHandler = (ele: HTMLDivElement): void => {
        const cardsContainer: HTMLDivElement | undefined | null = getCardContainer(ele);
        if (position === 1) {
            setScrollPosition(cardsContainer, props.cardsNumber);
            setPosition(props.cardsNumber);
        }
        else {
            setScrollPosition(cardsContainer, position-1);
            setPosition(position-1);
        }
    }
    const setScrollPosition = (cardContainerRef: HTMLDivElement | null | undefined, position: number): void => {
        let containerWidth: number;
        let horizontalMargin: number;
        if (cardContainerRef) {
            containerWidth = cardContainerRef.offsetWidth;
            horizontalMargin = (containerWidth-cardWidth)/2;
            cardContainerRef.scrollLeft = ((cardWidth)*(position))-horizontalMargin;
        }
    }
    const getCardContainer = (ref: HTMLDivElement): HTMLDivElement | null | undefined => {
        return ref.closest('.i-cards-v2-component')?.querySelector('.i-cards-v2-container');
    }
    const setInitialPosition = (): void => {
        const cardContainerRef: any | null | undefined = document.querySelector('.i-cards-v2-component')?.querySelector('.i-cards-v2-container');
        if (cardContainerRef && position === 1) setScrollPosition(cardContainerRef, 1);
    }
    useEffect(setInitialPosition);

    return (
        <div className="i-cards-v2-component">
            <h1>{props.title}</h1>
            <p>{props.summary}</p>
            <div className="i-cards-v2-container" style={{width: props.containerWidth}}>
                <CardList containerWidth={props.containerWidth} cardWidth={props.cardWidth} itemsNumber={props.cardsNumber} />
            </div>
            <div className="i-prev-next-buttons" style={{width: props.containerWidth}}>
                <div className="i-prev-button" onClick={(e: any) => prevHandler(e.currentTarget)} ><PrevCard/></div>
                <div className="i-next-button" onClick={(e: any) => nextHandler(e.currentTarget)} ><NextCard/></div>
            </div>
        </div>
    );
}

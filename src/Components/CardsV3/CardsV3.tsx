import { ReactElement, useEffect, useState } from "react";
import CardList from "./CardList";
import { CardsV3Properties } from "./CardsV3.Properties";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";

export default function Cards(props: CardsV3Properties): ReactElement {
    const [position, setPosition]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(1);
    const getFloatCardPosition = (containerWidth: number, cardWidth: number, scrollLeft: number): number => (scrollLeft+((containerWidth-cardWidth)/2))/cardWidth;
    const nextHandler = (ele: HTMLDivElement): void => {
        const cardsContainer: HTMLDivElement | undefined | null = getCardContainer(ele);
        (position === props.cardsNumber) ? setScrollPosition(cardsContainer, 1) : setScrollPosition(cardsContainer, position+1);
    }
    const prevHandler = (ele: HTMLDivElement): void => {
        const cardsContainer: HTMLDivElement | undefined | null = getCardContainer(ele);
        (position === 1) ? setScrollPosition(cardsContainer, props.cardsNumber) : setScrollPosition(cardsContainer, position-1);
    }
    const setScrollPosition = (cardContainerRef: HTMLDivElement | null | undefined, position: number): void => {
        let containerWidth: number;
        let horizontalMargin: number;
        if (cardContainerRef) {
            containerWidth = cardContainerRef.offsetWidth;
            horizontalMargin = (containerWidth-props.cardWidth)/2;
            cardContainerRef.scrollLeft = ((props.cardWidth)*(position))-horizontalMargin;
            setPosition(position);
        }
    }
    const getCardContainer = (ref: HTMLDivElement): HTMLDivElement | null | undefined => ref.closest('.i-cards-v3-component')?.querySelector('.i-cards-v3-container');
    const setInitialPosition = (): void => {
        const cardContainerRef: any | null | undefined = document.querySelector('.i-cards-v3-component')?.querySelector('.i-cards-v3-container');
        if (cardContainerRef && position === 1) setScrollPosition(cardContainerRef, 1);
    }
    const scrollHandler = (cardContainerRef: HTMLDivElement): void => {
        const containerWidth: number = cardContainerRef.offsetWidth;
        const intPosition: number = Math.round(getFloatCardPosition(containerWidth, props.cardWidth, cardContainerRef.scrollLeft));
        
        if (cardContainerRef.scrollLeft  === 0) setScrollPosition(cardContainerRef, props.cardsNumber);
        else if (cardContainerRef.scrollLeft  === (props.cardsNumber+2)*props.cardWidth-containerWidth) setScrollPosition(cardContainerRef, 1);
        else setPosition(intPosition);
    }
    useEffect(setInitialPosition);

    return (
        <div className="i-cards-v3-component">
            <h1>{props.title}</h1>
            <p>{props.summary}</p>
            <div className="i-cards-v3-container" onScroll={(e: any) => scrollHandler(e.currentTarget)} style={{width: props.containerWidth}}>
                <CardList containerWidth={props.containerWidth} cardWidth={props.cardWidth} itemsNumber={props.cardsNumber} />
            </div>
            <div className="i-prev-next-buttons" style={{width: props.containerWidth}}>
                <div className="i-prev-button" onClick={(e: any) => prevHandler(e.currentTarget)} ><PrevCard/></div>
                <div className="i-next-button" onClick={(e: any) => nextHandler(e.currentTarget)} ><NextCard/></div>
            </div>
        </div>
    );
}

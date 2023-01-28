import { ReactElement, useState } from "react";
import CardList from "./CardList";
import { CardsProperties } from "./Cards.Properties";
import NextCard from "./NextCard";
import PrevCard from "./PrevCard";

export default function Cards(props: CardsProperties): ReactElement {
    const [position, setPosition]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(1);
    const getFloatCardPosition = (containerWidth: number, scrollLeft: number): number => 1/(containerWidth/scrollLeft)+1;
    const scrollHandler = (ele: HTMLDivElement): void => {
        const containerWidth: number = ele.offsetWidth;
        const floatPosition: number = getFloatCardPosition(containerWidth, ele.scrollLeft);
        const toleranceRange: number = 0.3;
        let intPosition: number;

        if (floatPosition%1 < toleranceRange) {
            intPosition = Math.floor(floatPosition);
            setPosition(intPosition);
            setScrollPosition(ele, intPosition);
        }
        else if (1-(floatPosition%1) < toleranceRange) {
            intPosition = Math.round(floatPosition);
            setPosition(intPosition);
            setScrollPosition(ele, intPosition);
        }
    }
    const nextHandler = (ele: HTMLDivElement, cardsNumber: number): void => {
        const cardsContainer: HTMLDivElement | undefined | null = getCardContainer(ele);

        if (position === cardsNumber) {
            setScrollPosition(cardsContainer, 1);
            setPosition(1);
        }
        else {
            setScrollPosition(cardsContainer, position+1);
            setPosition(position+1);
        }
    }
    const prevHandler = (ele: HTMLDivElement, cardsNumber: number): void => {
        const cardsContainer: HTMLDivElement | undefined | null = getCardContainer(ele);

        if (position === 1) {
            setScrollPosition(cardsContainer, cardsNumber);
            setPosition(cardsNumber);
        }
        else {
            setScrollPosition(cardsContainer, position-1);
            setPosition(position-1);
        }
    }
    const setScrollPosition = (ele: HTMLDivElement | null | undefined, position: number): void => {
        if (ele) ele.scrollLeft = ((position-2)*ele.offsetWidth)+ele.offsetWidth
    }
    const getCardContainer = (ref: HTMLDivElement): HTMLDivElement | null | undefined => {
        return ref.closest('.i-cards-component')?.querySelector('.i-cards-container');
    }

    return (
        <div className="i-cards-component">
            <h1>{props.title}</h1>
            <p>{props.summary}</p>
            <div className="i-cards-container" onScroll={(e: any) => scrollHandler(e.currentTarget)} style={{width: props.containerWidth}}>
                <CardList itemsNumber={props.cardsNumber} containerWidth={props.containerWidth}></CardList>
            </div>
            <div className="i-prev-next-buttons" style={{width: props.containerWidth}}>
                <div className="i-prev-button" onClick={(e: any) => prevHandler(e.currentTarget, props.cardsNumber)} ><PrevCard/></div>
                <div className="i-next-button" onClick={(e: any) => nextHandler(e.currentTarget, props.cardsNumber)} ><NextCard/></div>
            </div>
        </div>
    );
}
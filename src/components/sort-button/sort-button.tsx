import React from 'react'
import { AscSortIcon, Button, ButtonWrapper, DescSortIcon } from './styles'

export interface SortButtonProps {
    /**
     * Button State of sort 
     *  - Ascendent
     *  - Descendent 
     *  - No sort
     */
    buttonState: "asc" | "desc" | "off"
    /**
     * Button text color
     */
    color: string;
    /**
     * Button background color
     */
    backgroundColor: string;
    /**
     * Button background color when active
     */
    activeBackgroundColor: string;
    /**
     * Button title
    */
    title: string;
    /**
     * On click handler
     */
    onClick: () => void
}

export const SortButton = (props: SortButtonProps) => {
    return (
        <ButtonWrapper
            data-testid="sortButton"
            color={props.color}
            backgroundColor={props.backgroundColor}
            activeBackgroundColor={props.activeBackgroundColor}
            onClick={props.onClick}
            isSorting={props.buttonState !== "off"}
        >
            {props.buttonState === "asc" && <AscSortIcon data-testid="ascIcon" />}
            {props.buttonState === "desc" && <DescSortIcon data-testid="descIcon" />}
            <Button>{props.title}</Button>
        </ButtonWrapper>
    )
}
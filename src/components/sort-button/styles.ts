import styled from "styled-components";
import { BsSortNumericUpAlt, BsSortNumericDown } from 'react-icons/bs';

interface IButtonProp {
    color: string;
    backgroundColor: string;
    isSorting: boolean;
}

export const ButtonWrapper = styled.div<IButtonProp>`
    display: flex;
    flex-direction: row;
    min-width: 100px;
    max-width: 200px;
    min-height: 25px;
    border: solid black 1px;
    border-radius: 10px;
    padding-inline: 5px;
    align-items: center;
    margin-inline: 10px;
    ${props => props.isSorting ? "" : "border: solid lightgray 1px;"}

    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};

    button {
        color: ${props => props.color};
    }
    
    &:hover {
        color: ${props => props.backgroundColor};
        background-color: ${props => props.color};
        box-shadow: 0 0 5px ${props => props.color};
        transform: scale(1.01);
        border: none;
        
        button,
        svg {
            color: ${props => props.backgroundColor};
            background-color: ${props => props.color}; 
        }
    }
`

export const AscSortIcon = styled(BsSortNumericDown)`
    display: flex;
    flex: 1;
`

export const DescSortIcon = styled(BsSortNumericUpAlt)`
    display: flex;
    flex: 1;
`

export const Button = styled.button`
    display: flex;
    flex: 3;
    justify-content: center;
    border: none;
    background-color: transparent;
`
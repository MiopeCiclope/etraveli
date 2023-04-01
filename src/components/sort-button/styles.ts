import styled from "styled-components";
import { BsSortNumericUpAlt, BsSortNumericDown } from 'react-icons/bs';

interface IButtonProp {
    color: string;
    backgroundColor: string;
    activeBackgroundColor: string;
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
    border: solid lightgray 1px;
    color: ${props => props.color};
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: ${props => props.isSorting ?
        props.activeBackgroundColor
        : props.backgroundColor};
            
    button {
        color: ${props => props.color};
    }
    
    &:hover {
        background-color: ${props => props.activeBackgroundColor};
        box-shadow: 0 0 5px gray;
        transform: scale(1.01);
        border: none;
        
        button,
        svg {
            background-color: ${props => props.activeBackgroundColor}; 
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
    
    &:hover {
        cursor: pointer;
    }
`
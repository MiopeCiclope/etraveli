import styled from "styled-components";
import { BiSortDown, BiSortUp } from 'react-icons/bi';

interface IButtonProp {
    color: string;
    backgroundColor: string;
}

export const ButtonWrapper = styled.div<IButtonProp>`
    display: flex;
    flex-direction: row;
    width: 120px;
    height: 30px;
    border: solid black 1px;
    border-radius: 10px;
    padding-inline: 5px;
    align-items: center;
    margin-inline: 10px;

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

        button,
        svg {
            color: ${props => props.backgroundColor};
            background-color: ${props => props.color}; 
        }
    }
`

export const AscSortIcon = styled(BiSortUp)`
    display: flex;
    flex: 1;
`

export const DescSortIcon = styled(BiSortDown)`
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
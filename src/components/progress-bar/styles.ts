import styled from "styled-components";

interface IProgressBarWrapperProp {
    percentage: number
}

export const ProgressBarWrapper = styled.div<IProgressBarWrapperProp>`
    display: flex;
    flex: 1;
    align-items:center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: gray;
    border: solid lightgray 1px;
    border-radius: 10px;
    width: 150px;
    height: fit-content;
    padding-left: 10px;
    background: linear-gradient(120deg
        , #0fbe26 0%
        , lightgreen ${props => props.percentage}%
        , white ${props => props.percentage + 1}%
        , white 100%);
    max-width: 150px;
    padding-inline: 5px;
    margin-bottom: 5px;
    margin-inline: 10px;

    span {
        display: flex;
        flex: 1;
        justify-content: center;
        padding: 2px;
    }
`
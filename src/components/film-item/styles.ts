import styled from "styled-components";

interface IProgressBarProp {
    percentage: number
}

export const ProgressBar = styled.div<IProgressBarProp>`
    display: flex;
    flex: 1;
    align-items:center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: gray;
    border: solid lightgray 1px;
    border-radius: 50px;
    width: 150px;
    height: 20px;
    background: linear-gradient(120deg
        , #0fbe26 0%
        , lightgreen ${props => props.percentage}%
        , white ${props => props.percentage + 1}%
        , white 100%);
    max-width: 150px;

    padding-inline: 5px;
    margin-inline: 10px;
    span {
        display: flex;
        flex: 1;
        justify-content: center;
    }
`
export const Title = styled.div`
    display: flex;
    justify-content: start;
    width: 60%
`


interface IFilmListItem {
    isSelected: boolean
}

export const FilmListItem = styled.div<IFilmListItem>`
    display: flex;
    flex-direction: row;
    align-items:center;
    font-size: 15px;
    justify-content: space-between;
    padding: 10px;
    border-bottom: solid lightgray 1px;
    ${props => props.isSelected ? " background-color: #e3fad8;" : ""}

    &:hover {
        cursor: pointer;
        font-weight: 600;
    }
`
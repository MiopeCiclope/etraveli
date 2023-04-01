import styled from "styled-components";

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
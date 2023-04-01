import styled from "styled-components";

export const HomeWrapper = styled.div`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    background-color: white;
    padding: 15px;
    border-radius: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const ListControls = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-height: 90px;
    padding: 5px;
    align-items: flex-start;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`

export const ListColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;  
    padding: 5px;
    border-right: solid lightgray 1px;
`
export const SortButtonWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
`

export const FilmList = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const DetailColumn = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    padding-top: 20px;
`
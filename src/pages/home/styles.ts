import styled from "styled-components";

export const HomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;

    div {
        background-color: lightgray;
    }
`

export const Header = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    max-height: 70px;
    padding: 5px;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`

export const Body = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px;
    flex-grow: 1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;    
`
export const SortButtonWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    max-width: 20%;
`
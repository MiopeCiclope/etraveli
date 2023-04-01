import styled from "styled-components";

export const HomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
`

export const Header = styled.div`
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

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    flex: 1;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;   
`
export const SortButtonWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: left;
    max-height: 40px;
`
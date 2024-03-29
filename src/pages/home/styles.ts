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
        height: auto;
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

    @media (max-width: 768px) {
        border: none;
    }
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
    height: fit-content;
`

export const YodaQuote = styled.img`
    object-fit: contain;
    max-width: 100%; 
    max-height: 100%;
    border-radius: 2px;
`

export const LoadingMessage = styled.div`
    text-align: center;
    font-size: 20px;
    font-family: monospace;
    letter-spacing: 3px;
    font-weight: 600;
    color: gray;
    font-variant-caps: small-caps;
`

export const ErrorMessage = styled.div`
    text-align: center;
    font-size: 20px;
    font-family: monospace;
    letter-spacing: 3px;
    font-weight: 600;
    background-color: #e16868;
    width: fit-content;
    margin-inline: auto;
    color: white;
    padding-inline: 30px;
    border-radius: 15px;
    font-variant-caps: small-caps;
`
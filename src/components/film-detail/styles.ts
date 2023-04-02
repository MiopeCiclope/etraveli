import styled from "styled-components";

export const Title = styled.h2`
    margin-bottom: 0;
`
export const DetailWrapper = styled.div`
    flex: 1
    display: flex;
`

export const Body = styled.div`
    padding-top: 10px;
    flex-direction: row;
    display: flex;
    flex: 1;   

    @media (max-width: 961px) {
        flex-direction: column;
    } 
`

export const Poster = styled.img`
    max-height: 300px;
    object-fit: contain;
    display: flex;
    border-radius: 2px;
    padding-left: 10px;
`

export const Description = styled.span`
    flex: 1;
    display: flex;
    margin-top: 20px;
    padding-inline: 10px;
    flex-direction: column;
`
export const RatingList = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
`
import styled from "styled-components";

export const SearchBarWrapper = styled.div`
    display: flex;
    flex: 1;
    height: 30px;
    max-width: 50%;
    margin-inline: 20px;
    flex-direction: row;
    border: solid gray 1px;
    border-radius: 15px;

    &:focus-within {
        outline-offset: 2px;
        box-shadow: 0 0 5px blue;
    }
`;

export const IconWrapper = styled.div`
    display: flex;
    flex: 1;
    max-width: 30px;
    align-items: center;
    justify-content: right;
    background-color: white !important;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
`

export const Text = styled.input`
    display: flex;
    flex: 1;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border: none;
    padding-left: 10px;

    &:focus {
        outline: none;
    }
`
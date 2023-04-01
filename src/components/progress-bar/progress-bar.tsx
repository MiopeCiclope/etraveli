import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { ProgressBarWrapper } from './styles';

interface IProgressBarProps {
    /**
    * Percentage off bar to be filled
    */
    percentage: number
    /**
    * Description inside the bar
    */
    label: string
}

export const ProgressBar = (props: IProgressBarProps) => {
    return (
        <ProgressBarWrapper percentage={props.percentage} data-testid="progressBar" >
            <span>{props.label} </span>
            <AiFillStar color='#e0e007' size={15} />
        </ProgressBarWrapper>
    )
}

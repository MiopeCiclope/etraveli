import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { IFilm } from '../../models/film-model';
import { FilmListItem, ProgressBar, Title } from './styles';

export interface IFilmItemProps {
    /**
     * Film from ImDB api
     */
    film: IFilm;
    /**
     * Highlight the item that was selected
     */
    isSelected: boolean;
    /**
     * Handle film click selection
     */
    onClick: () => void
}

/**
 * Film Item to display basic data
 */
export const FilmItem = (props: IFilmItemProps) => {
    const { film } = props
    const date = new Date(film.release_date)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <FilmListItem onClick={props.onClick} isSelected={props.isSelected} data-testid="filmItem" >
            <Title>{`Episode ${film.episode_id}: ${film.title} `}</Title>
            <ProgressBar percentage={film.averageRating} data-testid="progressBar" >
                <span>{Math.floor(film.averageRating)}%  </span>
                <AiFillStar color='#e0e007' size={15} />
            </ProgressBar>
            <span>{formattedDate}</span>
        </FilmListItem>
    )
}

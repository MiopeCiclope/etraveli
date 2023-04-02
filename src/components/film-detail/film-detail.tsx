import React from 'react'
import { IFilm } from '../../models/film-model';
import { ProgressBar } from '../progress-bar/progress-bar';
import { Body, Description, DetailWrapper, Poster, RatingList, Title } from './styles';

export interface IFilmItemProps {
    /**
     * Film from ImDB api
     */
    film: IFilm;
}

/**
 * Display film with details
 */
export const FilmDetail = (props: IFilmItemProps) => {
    const { film } = props
    return (
        <DetailWrapper>
            <Title>{`Episode ${film.episode_id}: ${film.title} `}</Title>
            <small>Directed by: {film.director}</small>
            <Body>
                <Poster alt={`${film.title}'s Poster`} src={film.poster} />
                <Description>
                    {film.opening_crawl}
                    <RatingList>
                        {film.ratings && film.ratings.length > 0 &&
                            film.ratings.map((rating, index) =>
                                <ProgressBar
                                    key={index}
                                    percentage={rating.value}
                                    label={rating.source === "Internet Movie Database" ? "IMDb" : rating.source}
                                />)
                        }
                    </RatingList>
                </Description>
            </Body>
        </DetailWrapper>
    )
}

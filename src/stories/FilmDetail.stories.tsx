import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilmDetail } from '../components/film-detail/film-detail';
import { IFilm } from '../models/film-model';


export default {
    title: 'Components/FilmDetail',
    component: FilmDetail,
} as ComponentMeta<typeof FilmDetail>;

const Template: ComponentStory<typeof FilmDetail> = (args) => <FilmDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
    film: {
        title: 'A New Hope',
        episode_id: 4,
        release_date: new Date("1994-02-15"),
        averageRating: 89.66666666666667,
        opening_crawl: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
        director: 'George Lucas',
        poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
        ratings: [
            {
                source: 'Internet Movie Database',
                value: 86
            },
            {
                source: 'Rotten Tomatoes',
                value: 93
            },
            {
                source: 'Metacritic',
                value: 90
            }
        ],
    } as IFilm,
};


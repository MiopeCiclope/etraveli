import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FilmItem } from '../components/film-item/film-item';
import { IFilm } from '../models/film-model';


export default {
    title: 'Components/FilmItem',
    component: FilmItem,
} as ComponentMeta<typeof FilmItem>;

const Template: ComponentStory<typeof FilmItem> = (args) => <FilmItem {...args} />;

export const Unselected = Template.bind({});
Unselected.args = {
    film: {
        title: 'A New Hope',
        episode_id: 4,
        release_date: new Date("1994-02-15"),
        averageRating: 89.66666666666667
    } as IFilm,
    onClick: () => console.log("click")
};

export const Selected = Template.bind({});
Selected.args = {
    film: {
        title: 'A New Hope',
        episode_id: 4,
        release_date: new Date("1994-02-15"),
        averageRating: 89.66666666666667
    } as IFilm,
    onClick: () => console.log("click"),
    isSelected: true
};
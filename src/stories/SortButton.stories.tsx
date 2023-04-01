import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SortButton } from '../components/sort-button/sort-button';


export default {
    title: 'Components/SortButton',
    component: SortButton,
} as ComponentMeta<typeof SortButton>;

const Template: ComponentStory<typeof SortButton> = (args) => <SortButton {...args} />;

export const SortButtonOff = Template.bind({});
SortButtonOff.args = {
    title: "Date",
    buttonState: 'off',
    color: 'black',
    backgroundColor: 'white',
    activeBackgroundColor: 'lightgreen',
    onClick: () => console.log("test")
};

export const SortButtonAsc = Template.bind({});
SortButtonAsc.args = {
    title: "Date",
    buttonState: 'asc',
    color: 'black',
    backgroundColor: 'white',
    activeBackgroundColor: 'lightgreen',
    onClick: () => console.log("test")
};

export const SortButtonDesc = Template.bind({});
SortButtonDesc.args = {
    title: "Date",
    buttonState: 'desc',
    color: 'black',
    backgroundColor: 'white',
    activeBackgroundColor: 'lightgreen',
    onClick: () => console.log("test")
};
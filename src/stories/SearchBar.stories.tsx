import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBar } from '../components/search-bar/search-bar';


export default {
    title: 'Components/SearchBar',
    component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    value: "test",
    placeholder: "Type search here",
    onChange: () => console.log("click")
};
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProgressBar } from '../components/progress-bar/progress-bar';


export default {
    title: 'Components/ProgressBar ',
    component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar  {...args} />;

export const Default = Template.bind({});
Default.args = {
    percentage: 20,
    label: "Default"
};
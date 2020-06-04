import React from 'react';
import Timeline from '../../visualisations/timeline';


// this is our target data format - maybe have colour instead of type?
const dummyData = [
    { feature: 'Menu - unauthenticated', start: new Date('2020-04-01'), end: new Date('2020-04-02'), epic: 'UI' },
    { feature: 'Menu - authenticated', start: new Date('2020-04-03'), end: new Date('2020-04-05'), epic: 'UI' },
    { feature: 'Create database schema', start: new Date('2020-04-01'), end: new Date('2020-04-04'), epic: 'Back End' },
    { feature: 'Create service', start: new Date('2020-04-01'), end: new Date('2020-04-22'), epic: 'Back End' },
    { feature: 'Create add user API end point', start: new Date('2020-05-01'), end: new Date('2020-05-04'), epic: 'User Accounts' },
    { feature: 'Create reset password API end point', start: new Date('2020-05-01'), end: new Date('2020-05-10'), epic: 'User Accounts' },
    { feature: 'Create login API end point', start: new Date('2020-04-21'), end: new Date('2020-04-25'), epic:'User Accounts' },
    { feature: 'Create registration form', start: new Date('2020-04-10'), end: new Date('2020-04-11'), epic:'User Accounts' },
    { feature: 'Integrate registration form', start: new Date('2020-05-03'), end: new Date('2020-05-11'), epic:'User Accounts' },
    { feature: 'Create login API end point', start: new Date('2020-04-11'), end: new Date('2020-04-22'), epic:'User Accounts' }
  ];

export default {
  title: 'Timeline',
  component: Timeline,
};

export const ToStorybook = () => <Timeline 
  data={dummyData}
  colourSeriesField='epic'
  startField='start'
  endField='end' />;

ToStorybook.story = {
  name: 'to Storybook',
};

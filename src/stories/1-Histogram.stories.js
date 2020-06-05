import React from 'react';
import Histogram from '../visualisations/histogram/histogram';

export default {
  title: 'Histogram',
  component: Histogram
};


const averages = [{


}];


// this is our target data format - maybe have colour instead of type?
const dummyData = [
  { date: new Date('2020-06-01'), tss: 0 },
  { date: new Date('2020-06-02'), tss: 70 },
  { date: new Date('2020-06-03'), tss: 44 },
  { date: new Date('2020-06-04'), tss: 112 },
  { date: new Date('2020-06-05'), tss: 24 },
  { date: new Date('2020-06-06'), tss: 310 },
  { date: new Date('2020-06-07'), tss: 0 },
  { date: new Date('2020-06-08'), tss: 34 },
  { date: new Date('2020-06-09'), tss: 50 },
  { date: new Date('2020-06-10'), tss: 14 },
  { date: new Date('2020-06-11'), tss: 120 },
  { date: new Date('2020-06-12'), tss: 14 },
  { date: new Date('2020-06-13'), tss: 370 },
  { date: new Date('2020-06-14'), tss: 0 }]

export const BasicHistogram = () =>  <Histogram 
  data={dummyData}
  dateField='date'
  valueField='tss' />;

  BasicHistogram.story = {
  name: 'Basic Histogram',
};


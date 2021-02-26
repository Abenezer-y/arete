import React from 'react';
import { Gauge } from '@ant-design/charts';

const GaugeChart = () => {
  var config = {
    percent: 0.85,
    range: {ticks: [0, 1 / 3, 2 / 3, 1], color: ['#F4664A', '#FAAD14', '#30BF78'],},
    indicator: {pointer: { style: { stroke: '#D0D0D0' } }, pin: { style: { stroke: '#D0D0D0' } },},
    statistic: {content: {style: {fontSize: '30px', lineHeight: '66px',},},},
};
  return <Gauge {...config} />;
};

export default GaugeChart;

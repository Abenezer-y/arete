import React from 'react';
import { Pie } from '@ant-design/charts';


const DonutChart = (props) => {
  var config = {
    appendPadding: 6,
    data: props.data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    innerRadius: 0.54,
    meta: {value: {formatter: function formatter(v) {return ''.concat(v);},},},
    label: { type: 'inner', offset: '-40%', style: { textAlign: 'center', fontSize: "12px", }, autoRotate: false, content: '{value}',},
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }, { type: 'pie-statistic-active' },],
  };
  return <Pie {...config} />;
};
export default DonutChart;
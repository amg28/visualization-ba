import React from 'react';
import ReactEcharts from 'echarts-for-react'
import {components} from './software-components.json'
import './App.css';

function App() {

        //Role names
        const rolesList = [...new Set(components.map(c => c.role))];

        //Component count per role
        const componentCountDeveloper = countComponents("Developer");
        const componentCountDesigner = countComponents("Designer");
        const componentCountLeadDeveloper = countComponents("Lead Developer");

        //Pie chart settings
        const optionsPerRole = {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 10,
              data: rolesList
          },
          series: [
              {
                  name: 'Components',
                  type: 'pie',
                  radius: ['70%', '90%'],
                  avoidLabelOverlap: true,
                  label: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      label: {
                          show: true,
                          fontSize: '24',
                          fontWeight: 'bold'
                      }
                  },
                  labelLine: {
                      show: false
                  },
                  data: [
                      {value: componentCountDeveloper, name: 'Developer'},
                      {value: componentCountDesigner, name: 'Designer'},
                      {value: componentCountLeadDeveloper, name: 'Lead Developer'},
                  ]
              }
          ]
      };

      //Spirits chart settings
      const maxData = 40;
      const spirit = components;
      const optionsPerComponents = {
        tooltip: {
        },
        xAxis: {
            max: maxData,
            splitLine: {show: false},
            offset: -10,
            axisLine: {
                lineStyle: {
                    color: '#999'
                }
            },
            axisLabel: {
                margin: 10
            }
        },
        yAxis: {
            data: rolesList,
            inverse: false,
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
                margin: 10,
                color: '#999',
                fontSize: 16
            }
        },
        grid: {
            top: 'center',
            height: 200,
            left: 150,
            right: 100
        },
        series: [{
            // current data
            type: 'pictorialBar',
            symbol: spirit,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: [componentCountDeveloper, componentCountDesigner, componentCountLeadDeveloper, componentCountDeveloper+componentCountDesigner+componentCountLeadDeveloper],
            markLine: {
                symbol: 'none',
                label: {
                    formatter: 'max: {c}',
                    position: 'start'
                },
                lineStyle: {
                    color: 'green',
                    type: 'dotted',
                    opacity: 0.2,
                    width: 2
                },
                data: [{
                    type: 'max'
                }]
            },
            z: 10
        }, {
            // full data
            type: 'pictorialBar',
            itemStyle: {
                normal: {
                    opacity: 0.2
                }
            },
            label: {
                show: true,
                formatter: function (params) {
                    return (params.value / maxData * 100).toFixed(1) + ' %';
                },
                position: 'right',
                offset: [10, 0],
                color: 'green',
                fontSize: 18
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbol: spirit,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: [891, 1220, 660, 1670],
            z: 5
        }]
    };
      
  
  return (
    <div className="App">
        <ReactEcharts option={optionsPerRole} />
        <hr></hr>
        <ReactEcharts option={optionsPerComponents} />
    </div>
  );
}

function countComponents(role) {
  return components.filter(component => component.role === role).length;
}

export default App;
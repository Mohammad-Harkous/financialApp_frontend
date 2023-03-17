import React from "react";
import ReactApexChart from "react-apexcharts"
import { useState } from "react";
function Chart (){
  var x = 12
  
    const[state,setState]=useState({series: [{
      name: 'Income',
      data: [44, 55, 57, 56, 61, 58, 63, 600, 66,12,13,x]
    }, {
      name: 'Total',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94,2000]
    }, {
      name: 'Expense',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded'
          
          
        },
      },
      dataLabels: {
        enabled: false,
        
        
      },
      
      stroke: {
        show: true,
        width: 1,
        colors: ['gray']
      },
      xaxis: {
        categories: ['jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','nov','dec',],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1,
        
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
  });

  return (
        

  
    <ReactApexChart options={state.options} series={state.series} type="bar" height={400}  width={885} />
    
          )
    }

    export default Chart;

  

    
  
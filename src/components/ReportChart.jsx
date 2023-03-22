
import React from "react";
import ReactApexChart from "react-apexcharts"
import { useState, useEffect } from "react";
import axios from "axios";
function RepChart (props){
    let year=props.value
    console.log(year)
  

  
   
  
  
  
    const[state,setState]=useState({series: [{
      name: 'Income',
      data: []
    }, {
      name: 'Total',
      data: []
    }, {
      name: 'Expense',
      data: []
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
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    const income=[]
    const expense=[]
    const total=[]
    axios.get(`http://127.0.0.1:8000/api/report/${year}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(response=>{
          income.push(response.data[0].income)
          expense.push(response.data[0].expense)
          total.push(response.data[0].total)
          console.log(income[0])
          console.log(expense)
          console.log(total)
          setState({series: [{
            name: 'Income',
            data: income[0],
          }, {
            name: 'Total',
            data: total[0],
          }, {
            name: 'Expense',
            data: expense[0],
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
          
          })
          })
          
     
       



      },
      
    [year]);
    


 

  return (
        

  
    <ReactApexChart options={state.options} series={state.series} type="bar" height={360}  width={1400} />
    
          )
    }

    export default RepChart;

  

    
  
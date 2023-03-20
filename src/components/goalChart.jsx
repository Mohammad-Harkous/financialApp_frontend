import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts"
import { useState } from "react";


function Circle (props){
  let per=props.percent
  
  const[state,setState]=useState({
       
    
    series: [per],
    options: {
      chart: {
        height: 350,
        type: 'radialBar',
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: 'gray',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
      
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: 'black',
              fontSize: '30px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val);
              },
              color: '#304DAF',
              fontSize: '45px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        colors:['#00E396'],
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.2,
          gradientToColors: ['#FEB019',],
          inverseColors: true,
          opacityFrom: 0.9,
          opacityTo: 2,
          stops: [20,40,60]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['%'],
    },
  
  
  });

  useEffect(()=>{
  
         setState({
       
    
          series: [per],
          options: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: true
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: 'gray',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: 'black',
                    fontSize: '30px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#304DAF',
                    fontSize: '45px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              colors:['#00E396'],
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.2,
                gradientToColors: ['#FEB019',],
                inverseColors: true,
                opacityFrom: 0.9,
                opacityTo: 2,
                stops: [20,40,60]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['%'],
          },
        
        
        })
      
      },[per])





  return (
    


  <ReactApexChart options={state.options} series={state.series} type="radialBar" height={300}  width={400} />
    )
 
  
      

  }
      export default Circle;
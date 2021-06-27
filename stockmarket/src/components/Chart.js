
import React,{useState,useEffect} from 'react';
import { Line ,Bar} from "react-chartjs-2";
import './chart.css';


function convert_time(timestamp){
    
    var theDate = new Date(timestamp * 1000);
    var dateString = theDate.toLocaleDateString();
    return dateString; 
}

   

export const Chart = ({symbol,charttype,range,interval}) => {
    const [xlet,setxlet] = useState([]);
    const [ylet,setylet] = useState([]);
    const [x2let,setx2let] = useState([]);

    useEffect(() => {
        async function getData(symbol,range,interval){
            console.log(range);
             console.log(interval);
             var vxlet = [];
             var vylet = [];
             var vx2let = [];
             
                const response = await fetch (`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?region=US&lang=en&symbol=${symbol}
                &interval=${interval}&range=${range}&rapidapi-key=35a6bda002mshe28e11703e65a22p1fac4djsn27decb9d3157`)
                const data = await (await response).json();
                  var open = data.chart.result[0].indicators.quote[0].open;
                  open.forEach((open) => {
                    vxlet.push(open.toFixed(4));
                  })
                  setxlet(vxlet);
                  var close = data.chart.result[0].indicators.quote[0].close;
                  close.forEach((close) => {
                    vx2let.push(close.toFixed(4));
                  })
                  setx2let(vx2let);
                  var timestamp = data.chart.result[0].timestamp;
                  timestamp.forEach((timestamp) => {
                      vylet.push(convert_time(timestamp));
                })
                setylet(vylet);
        }
        getData(symbol,range,interval);
        
    },[symbol,range,interval]);
    
    
    
    return (
        <div className = "linegraph">
           {charttype === "Bar" && <Bar data = {{
                labels: ylet,
                datasets: [{
                    label: `OPENING PRICE OF ${symbol}`,
                    fill: 'false',
                    data: xlet,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    
                },
                {
                    label: `CLOSING PRICE OF ${symbol}`,
                    fill: 'false',
                    data: x2let,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]}
            }
                
         options = {{
            responsive: false,
            plugins: {
                zoom: {
                    pan: {
                        enabled:true,
                        mode: 'x',
                        speed: 20,
                    },
                    zoom: {
                        enabled: true,
                        drag: true,
                        mode: 'x',
                        speed: 0.05
                    }
                }
            }}
         }/>} 
        
         {charttype === "Line" && <Line height = {"400px"}   data = {{
                labels: ylet,
                datasets: [{
                    label: `OPENING PRICE OF ${symbol}`,
                    fill: 'false',
                    data: xlet,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    
                },
                {
                    label: `CLOSING PRICE OF ${symbol}`,
                    fill: 'false',
                    data: x2let,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]}
            }
                
         options = {{
            responsive: false,
            plugins: {
                zoom: {
                    pan: {
                        enabled:true,
                        mode: 'x',
                        speed: 20,
                    },
                    zoom: {
                        enabled: true,
                        drag: true,
                        mode: 'x',
                        speed: 0.05
                    }
                }
            }}
         }/>} 
        </div>
    )
}
export default Chart;

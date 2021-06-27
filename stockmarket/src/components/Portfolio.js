import React,{useState,useEffect} from 'react';
import {Card,CardContent,CardActions,Typography} from '@material-ui/core';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
 import Chart from './Chart';


const Portfolio = () => {
    const [stockname,setstockname] = useState("");
    const [fav,setfav] = useState("");
    const [issearched,setissearched] = useState(false);
    const [price,setprice] = useState();
    const [email,setemail] = useState("");
    const [favourites,setfavourites] = useState([]);
    
    const searchstocks =async (e) => {
        e.preventDefault();
        
        console.log(stockname);
        fetch(`https://api.twelvedata.com/price?symbol=${stockname}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`)
        .then(response => (response.json()))
        .then(data => {
            if(data.code !== 400){
                setissearched(true);
                setprice(data.price);
                setfav(stockname);
            }
            
                        
                       
                    })


    }
    useEffect( () => {
        const tokening = () => {
                    var token = window.localStorage.getItem('token');
            
            var decoded = jwt_decode(token);
            setemail(decoded.users.email);
                }
                
                
                tokening();
                

    }
    
    
    ,[])
    useEffect(()=>{
        const getfav = async () =>{
            let data = [];
            axios.post('http://localhost:5000/getfav',{email:email})
        .then(response =>{console.log(response)
        response.data.forEach(async (loop) => {
            let price = await fetch(`https://api.twelvedata.com/price?symbol=${loop}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`)
           let pricing = await price.json();
            pricing = pricing.price;;
            ;
                             data.push({
            stock : loop,
            price : pricing,
        })});
        setfavourites(data);
        console.log(data);
            
        
        })};
        getfav();

    },[email])
        
        
        

   
    
    const addtofav = (e) => {
        e.preventDefault();
        try{
            axios.post('http://localhost:5000/details', {
              
              Email: email,
              company:fav
            })
              }catch(err){
             console.log(err);
           }
        

    }

    return (
        <div>
            
            <h1> Add Stocks to favourites</h1>
            <div>
                <div className = "label"> <label> Search your stock</label> </div>
                <div className = "input">
                <input 
                    type = "text"
                     name = "searchstock"
                      value = {stockname}
                      onChange = {(e) => setstockname(e.target.value)}/>
                </div>
                <div className = "button">
                    <button onClick = {(e) => searchstocks(e)}> button</button>

                </div>
            
            </div>
             { issearched && <Card > 
                <CardContent>
                    <Typography>
                        {fav}
                        {price}

                    </Typography>
                    <CardActions>
                        <button onClick = {(e) => addtofav(e)} >add to fav </button>
                    </CardActions>
                    
                </CardContent>
            </Card>}

            {favourites.map(( loop )=> {
           return(<Card key = {loop.stock}>
            <CardContent>
                <Typography>
                    {loop.stock}
                    
                </Typography>
                <Typography>
                    {loop.price}
                    
                </Typography>
                <Chart  symbol = {loop.stock} range = "3mo" interval = "1d" charttype = "Line" />
            </CardContent>
        </Card>) 

            })}
           
            


        </div>
    )
}

export default Portfolio

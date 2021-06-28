import React,{useState,useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Card,CardContent,Typography,CardActions } from '@material-ui/core';


const Bought = () => {
    const [issearched,setissearched] = useState(false);
    const [stockname,setstockname] = useState("");
    const [fav,setfav] = useState("");
    const [price,setprice] = useState();
    const [volume,setvolume] = useState(0);
    const [email,setemail] = useState("");
    const [bought,setbought] = useState([]);
    // const [id,setid] = useState("");

    useEffect( () => {
        const tokening = () => {
                    var token = window.localStorage.getItem('token');
            
            var decoded = jwt_decode(token);
            setemail(decoded.users.email);
                }
                
                
                tokening();
                

    }
    
    
    ,[])

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

    const buy = (e) => {
        e.preventDefault();
        try{
            axios.post('http://localhost:5000/buyps', {
              
              Email: email,
              company:fav,
              volume : volume,
            })
              }catch(err){
             console.log(err);
           }
        

    }
    useEffect(()=>{
        const getbought = async () =>{
            let data = [];
            axios.post('http://localhost:5000/getbought',{email:email})
        .then(response =>{console.log(response)
        response.data.forEach(async (loop) => {
            let price = await fetch(`https://api.twelvedata.com/price?symbol=${loop.stockname}&apikey=734363d03f5e4e4c9d80c0938eb6ab32`)
           let pricing = await price.json();
            pricing = pricing.price;;
            ;
        data.push({
            stock : loop,
            price : pricing,
        })});
        setbought(data);
        console.log(data);
            
        
        })};
        if(email !== "")
        getbought();

    },[email])

    
        const sell = (e,ide,nam,volu) => {
            e.preventDefault();
            console.log(ide);
            axios.post("http://localhost:5000/sell",{email: email,
        object : ide,
    symbol:nam,
volume:volu})
        .then((err) => {console.log(err)})
        }
        
    
    // const sell = (e) => {
    //     e.preventDefault();
    //     console.log(loop.stock._id);
    // }
    return (
        <div>
           <h1> Add Stocks to buy</h1>
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
                        <label for = "volume" > enter volume</label>
                        <input name = "volume" type = "number" value = {volume} required onChange = {(e) => (setvolume(e.target.value))}/>
                        <button onClick = {(e) => buy(e)} >buy the stock </button>
                    </CardActions>
                    
                </CardContent>
            </Card>}

            {bought.map(( loop )=> {
           return(<Card key = {loop.stock._id}>
            <CardContent>
                <Typography>
                    {loop.stock.stockname}
                    
                </Typography>
                <Typography>
                    {loop.stock.stockvolume}</Typography>
                    <Typography>
                    {loop.price}
                    
                </Typography>
                <CardActions>
                        <button onClick = {async (e) => {
                        console.log(loop.stock._id)
                        sell(e,loop.stock._id,loop.stock.stockname,loop.stock.stockvolume)}} >sell </button>
                    </CardActions>
             
            </CardContent>
        </Card>) 

            })}
        </div>
    )
}

export default Bought;

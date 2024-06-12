import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

const Coin = () => {

const {coinId} = useParams();
const [coinData, setCoinData] = useState();
const {currency} = useContext(CoinContext)

const fetchCoinData = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // You no longer need the API key here since it's handled by the proxy server
    }
  };
  
  const coinId = 'ethereum'; // Replace with the dynamic coinId variable as needed
  
  fetch(`http://localhost:3000/api/coins/${coinId}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(response => setCoinData(response))
    .catch(err => console.error('Fetch error:', err));
  
}

useEffect(()=>{
  fetchCoinData();
},[currency])

if(coinData){
  return (
    <div className="coin">
     <div className="coin-name">
      <img src={coinData.image.large} alt="" />
      <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
     </div>
    </div>
  );
}else{
  return (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  )
}

  
};

export default Coin;

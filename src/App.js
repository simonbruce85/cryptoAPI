import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Coin from './Coin';


function App() {


  const [coins, setCoins] = useState([]);
  const [search, seatSearch] = useState('');

  useEffect(() => {

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
      .then(res => {
        setCoins(res.data);
      }).catch(error => console.log(error));
  }, [])

  const handleChange = e => { 
    seatSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className='coin-App'>
      <div className='coin-search'>
        <h1 className='coin-text'>search a currency</h1>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange} />
        </form>
      </div>
      <div className='coin-container'>
        <div className='coin-row'>
          <div className='coin'>
            <p className='coin-name'>Name</p>
            <p className='coin-symbol-2'>Symbol</p>
          </div>
          
          <div className='coin-data'>
            <p className='coin-price'>Price</p>
            <p className='coin-volume'>Volume 24h</p>
            <p className='coin-percent'>% 24h</p>
            <p className='coin-marketcap'>Market Cap</p>
          </div>
        </div>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id} name={coin.name} img={coin.image} symbol={coin.symbol} volume={coin.total_volume} price={coin.current_price} priceChange={coin.price_change_percentage_24h} marketcap={coin.market_cap} />
        )
      })}
    </div>
  );
}

export default App;

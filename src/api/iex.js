import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
});

export function loadQuoteForStock(symbol) {
  return api.get (`/stock/${symbol}/quote`).then((res) => {return res.data});

}

// to add a logo we need other function just like above

export function loadLogoForStock(symbol) {
  return api.get (`/stock/${symbol}/logo`).then((res) => {return res.data});

}

// data is : all data from : https://api.iextrading.com/1.0 /stock/${symbol}/quote

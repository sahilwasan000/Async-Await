//fixer.io -> Api that lets you get a real time currency exchange values.
// http://restcountries.eu -> Api that lets you know where a particular currency is valid.

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=32b4d5d86a599a032368ed7d1aa727e6&format=1').then((response) => {
//       const euro = 1/response.data.rates[from];
//       const rate = euro * response.data.rates[to];
//       return rate;
//     });
// };

const getExchangeRate = async (from, to) => {

      const response = await axios.get('http://data.fixer.io/api/latest?access_key=32b4d5d86a599a032368ed7d1aa727e6&format=1');
      const euro = 1/response.data.rates[from];
      const rate = euro * response.data.rates[to];
      return rate;
};

getExchangeRate('USD','CAD').then((rate) => {
  console.log(rate);
});

// const getCountries = (currency) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`).then((response) => {
//     return response.data.map((country) => country.name);
//   })
// };

const getCountries = async (currency) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
    return response.data.map((country) => country.name);
};

getCountries('INR').then((countries) => {
  console.log(countries);
});
